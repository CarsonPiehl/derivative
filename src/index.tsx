import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import functionPlot from 'function-plot';
import {derivative,evaluate} from 'mathjs';

let fn = 'x*x';
let h = 5;
let x = 0;
let graphRoot = 'graph';

let options = {
  target: '#'+graphRoot,
  grid: true,
  data: [
    { // function
      fn: fn,
      color: 'steelblue',
    },
    { // h vector
      vector: [h,0],
      offset: [x,evaluate(fn,{x:x})],
      graphType: 'polyline' as 'polyline',
      fnType: 'vector' as 'vector',
    },
    { // f(x+h) - f(x) vector
      vector: [0, evaluate(fn,{x:x+h}) - evaluate(fn,{x:x})],
      offset: [x+h, evaluate(fn,{x:x})],
      graphType: 'polyline' as 'polyline',
      fnType: 'vector' as 'vector',
    },
  ]
}

// we really on some coding shit now. Interfaces mother fucker

interface graphProps {
  fn: string,
  h: number,
  x: number,
  graphRoot: string,
  options: any, // this is an admission of defeat and it was totally worth it for not having to figure out how to define an options type
} // Just to clarify, the options prop basically will literally just opt out of typescript
// https://www.typescriptlang.org/docs/handbook/basic-types.html at the any bit



class Graph extends React.Component<graphProps,graphProps>  { // State is just props (but we will change it) for now, no need to use different interfaces
  public state:graphProps = { // not your typical constructor, apparently this is the TypeScript way to do state now: https://stackoverflow.com/questions/51074355/cannot-assign-to-state-because-it-is-a-constant-or-a-read-only-property
    fn: this.props.fn,
    h: this.props.h,
    x: this.props.x,
    graphRoot: this.props.graphRoot,
    options: this.props.options,
  }




  changeFn() {
    try {
      let textbox = document.getElementById("editing") as HTMLInputElement;
      if (textbox.value !== '') {
        let newState = Object.assign({}, this.state);
        let fn = textbox.value;
        newState.options.data[0].fn = fn;
        newState.fn = fn;
        this.state = newState; // I trust daddy react implicitly about mutation but this seems convoluted. What do I know tho tbf, I'm a fucking monkey
      }
      functionPlot(this.state.options);
    }
    catch(err) {
      console.log(err);
    }
  }
  
  changeH() {
    let x = this.state.x;
    let fn = this.state.fn;
    let slider = document.getElementById("hslider") as HTMLInputElement;
    let newState = Object.assign({}, this.state); // React does NOT like you mutating the state directly so I have to do this copying monstrosity from SO: https://stackoverflow.com/questions/45557301/how-to-change-the-state-with-react-typescript-2-0
    let h = parseFloat(slider.value);

    // this.state is decapitated from the namespace here for readability and convenience

    newState.options.data[1].vector = [h,0];
    // no need to change first offset, doesn't have an h val for calculation
    newState.options.data[2].vector = [0, evaluate(fn,{x:x+h}) - evaluate(fn,{x:x})];
    newState.options.data[2].offset = [x+h, evaluate(fn,{x:x})];
    newState.h = h;

    this.state = newState;
    functionPlot(this.state.options);
  }

  changeX() {
    let h = this.state.h;
    let fn = this.state.fn;
    let slider = document.getElementById("xslider") as HTMLInputElement;
    let newState = Object.assign({}, this.state); // React does NOT like you mutating the state directly so I have to do this copying monstrosity from SO: https://stackoverflow.com/questions/45557301/how-to-change-the-state-with-react-typescript-2-0
    let x = parseFloat(slider.value);

    // Again this.state is decapitated from the namespace here for readability and convenience


    // no need to change first vector, doesn't use x
    newState.options.data[1].offset = [x,evaluate(fn,{x:x})];
    newState.options.data[2].vector = [0, evaluate(fn,{x:x+h}) - evaluate(fn,{x:x})];
    newState.options.data[2].offset = [x+h, evaluate(fn,{x:x})];
    newState.x = x;

    this.state = newState;
    functionPlot(this.state.options);
  }

  render() {
    return(
      <div id ="container">
      <div id = {graphRoot}></div>
      <div id = "inputs">
      <input type="text" id="editing" onInput={() => this.changeFn()}>
      </input>
      <label htmlFor={"h"}> Change h </label>
      <input type="range" id ="hslider" name = "h" min="0" max="10" step="0.01" onInput={() => this.changeH()}>
      </input>
      <label htmlFor={"x"}> Change x </label>
      <input type = "range" id="xslider" name = "x" min = "-10" max = "10" step ="0.01" onInput={() => this.changeX()}></input>
      </div>
      </div >
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Graph fn={fn} h={h} x={x} graphRoot={graphRoot} options={options}/>
  </React.StrictMode>,
  document.getElementById('root')
);
functionPlot(options); // Ideally we would get the initial call inside the class, but idk how

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
