import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//@ts-ignore 
import MathJax from 'react-mathjax2'
import reportWebVitals from './reportWebVitals';
import functionPlot from 'function-plot';
import {derivative,evaluate} from 'mathjs';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

let fn = 'x*x';
let h = 5;
let x = 0;
let graphRoot = 'hgraph';
let aGraphRoot = 'agraph';

let aOptions = {
  target: '#' + aGraphRoot,
  grid: true,
  width: 800,
  height: 500,
  data: [
    { // function
      fn: fn,
      secants: [
        {x0: x, x1: x+h},
      ],
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

let hOptions = {
  target: '#'+graphRoot,
  grid: true,
  width: 800,
  height: 500,
  data: [
    { // function
      fn: fn,
      secants: [
        {x0: x, x1: x+h},
      ],
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

interface hGraphProps {
  fn: string,
  h: number,
  x: number,
  graphRoot: string,
  options: any, // this is an admission of defeat and it was totally worth it for not having to figure out how to define an options type
} // Just to clarify, the options prop basically will literally just opt out of typescript
// https://www.typescriptlang.org/docs/handbook/basic-types.html at the any bit'

interface aGraphProps {
  fn: string,
  a: number,
  x: number,
  graphRoot: string,
  options: any,
}


interface hGraphState {
  fn: string,
  derivative: string,
  h: number,
  x: number,
  slope: number,
  trueSlope: number,
  graphRoot: string,
  options: any, 
}

interface aGraphState {
  fn: string,
  derivative: string,
  a: number,
  x: number,
  slope: number,
  trueSlope: number,
  graphRoot: string,
  options: any, 
}


class AGraph extends React.Component<aGraphProps> {
  public state:aGraphState = { // not your typical constructor, apparently this is the TypeScript way to do state now: https://stackoverflow.com/questions/51074355/cannot-assign-to-state-because-it-is-a-constant-or-a-read-only-property
    fn: this.props.fn,
    derivative: derivative(this.props.fn,'x').toString(),
    a: this.props.a,
    x: this.props.x,
    slope: ((evaluate(this.props.fn,{x : this.props.a}) - evaluate(this.props.fn,{x:this.props.x})) / (this.props.a - this.props.x)),
    trueSlope: evaluate(derivative(this.props.fn,'x').toString(),{x: this.props.x}),
    graphRoot: this.props.graphRoot,
    options: this.props.options,
  }




  changeFn(fn: string) {
    try {
      if (fn !== '') {
        let newState = Object.assign({}, this.state);
        let x  = newState.x;
        let a  = newState.a;
        let rise = evaluate(fn,{x:a}) - evaluate(fn,{x:x});
        // Update everything b/c new function
        newState.options.data[0].fn = fn;
        newState.fn = fn;
        newState.derivative = derivative(fn,'x').toString();
        newState.options.data[0].secants[0] = {
          x0: x,
          x1: a,
        }
        newState.options.data[1].vector = [a-x,0];
        newState.options.data[1].offset = [x,evaluate(fn,{x:x})];
        newState.options.data[2].vector = [0, rise];
        newState.options.data[2].offset = [a, evaluate(fn,{x:x})];
        newState.slope = rise / a-x;
        newState.trueSlope = evaluate(newState.derivative, {x:x});

        this.setState(newState); // I trust daddy react implicitly about mutation but this seems convoluted. What do I know tho tbf, I'm a fucking monkey
      }
      functionPlot(this.state.options);
    }
    catch(err) {
      console.log(err);
    }
  }
  
  changeA(a: number) {
    let x = this.state.x;
    let fn = this.state.fn;
    let newState = Object.assign({}, this.state); // React does NOT like you mutating the state directly so I have to do this copying monstrosity from SO: https://stackoverflow.com/questions/45557301/how-to-change-the-state-with-react-typescript-2-0
    //let a = parseFloat(slider.value);
    let rise = evaluate(fn,{x:a}) - evaluate(fn,{x:x}); // y1 - y2 convenience var

    // this.state is decapitated from the namespace here for readability and convenience

    newState.options.data[1].vector = [a-x,0];
    // no need to change first offset, doesn't have an h val for calculation
    newState.options.data[2].vector = [0, rise];
    newState.options.data[2].offset = [a, evaluate(fn,{x:x})];
    newState.options.data[0].secants[0] = {
      x0: x,
      x1: a,
    }
    newState.slope = rise / (a-x);
    // no need to change true slope, only changes with x
    
    newState.a = a;
    this.setState(newState);

    functionPlot(this.state.options);
  }

  changeX(x: number) { // TODO: FINISH UPDATING THIS BIT
    let a = this.state.a;
    let fn = this.state.fn;
    let newState = Object.assign({}, this.state); // React does NOT like you mutating the state directly so I have to do this copying monstrosity from SO: https://stackoverflow.com/questions/45557301/how-to-change-the-state-with-react-typescript-2-0
    //let x = parseFloat(slider.value);
    let rise = evaluate(fn,{x:a}) - evaluate(fn,{x:x}); // y1 - y2 convenience var
    // Again this.state is decapitated from the namespace here for readability and convenience


    // no need to change first vector, doesn't use x
    newState.options.data[1].offset = [x,evaluate(fn,{x:x})];
    newState.options.data[1].vector = [a-x,0]
    newState.options.data[2].vector = [0, rise];
    newState.options.data[2].offset = [a, evaluate(fn,{x:x})];
    newState.options.data[0].secants[0] = {
      x0: x,
      x1: a,
    }
    newState.slope = rise / (a-x);
    newState.trueSlope = evaluate(newState.derivative, {x:x});
    newState.x = x;
    this.setState(newState);

    functionPlot(this.state.options);
  }

  render() {
    return(
      <div id ="container">
      <div id = {this.state.graphRoot}></div>
      <div id = "inputs">
      <div id="slopes">
      <h2 id = "calcslope"> {"Calculated Slope: " + Math.round((this.state.slope + Number.EPSILON) * 1000) / 1000} </h2>
      <h2 id = "trueslope"> {"True Slope: " + Math.round((this.state.trueSlope + Number.EPSILON) * 1000) / 1000} </h2> 
      </div>
      <div id="sliders">
      <div className = "barVal">
      <h3 id = "hlabel"> {"a: " + this.state.a} </h3>
      <input type="range" id ="hslider" name = "h" min="-10" max="10" step="0.01" defaultValue = {this.props.a} onChange={(event) => this.changeA(parseFloat(event.target.value))}>
      </input>
      </div>
      <div className = "barVal">
      <h3 id = "xlabel"> {"x: " + this.state.x} </h3>
      <input type = "range" id="xslider" name = "x" min = "-10" max = "10" step ="0.01" defaultValue = {this.props.x} onChange={(event) => this.changeX(parseFloat(event.target.value))}></input>
      </div>
      </div>
      <input type="text" id="editing" defaultValue = {this.props.fn} onChange={(event) => this.changeFn(event.target.value)}>
      </input>
      </div>
      </div>
    );
  }
}


class HGraph extends React.Component<hGraphProps,hGraphProps>  { // State is just props (but we will change it) for now, no need to use different interfaces
  public state:hGraphState = { // not your typical constructor, apparently this is the TypeScript way to do state now: https://stackoverflow.com/questions/51074355/cannot-assign-to-state-because-it-is-a-constant-or-a-read-only-property
    fn: this.props.fn,
    derivative: derivative(this.props.fn,'x').toString(),
    h: this.props.h,
    x: this.props.x,
    slope: ((evaluate(this.props.fn,{x : this.props.x + this.props.h}) - evaluate(this.props.fn,{x:this.props.x})) / this.props.h),
    trueSlope: evaluate(derivative(this.props.fn,'x').toString(),{x: this.props.x}),
    graphRoot: this.props.graphRoot,
    options: this.props.options,
  }




  changeFn(fn: string) {
    try {
      if (fn !== '') {
        let newState = Object.assign({}, this.state);
        let x  = newState.x;
        let h  = newState.h;
        let rise = evaluate(fn,{x:x+h}) - evaluate(fn,{x:x});
        // Update everything b/c new function
        newState.options.data[0].fn = fn;
        newState.fn = fn;
        newState.derivative = derivative(fn,'x').toString();
        newState.options.data[0].secants[0] = {
          x0: x,
          x1: x+h,
        }
        newState.options.data[1].vector = [h,0];
        newState.options.data[1].offset = [x,evaluate(fn,{x:x})];
        newState.options.data[2].vector = [0, rise];
        newState.options.data[2].offset = [x+h, evaluate(fn,{x:x})];
        newState.slope = rise / h;
        newState.trueSlope = evaluate(newState.derivative, {x:x});

        this.setState(newState); // I trust daddy react implicitly about mutation but this seems convoluted. What do I know tho tbf, I'm a fucking monkey
      }
      functionPlot(this.state.options);
    }
    catch(err) {
      console.log(err);
    }
  }
  
  changeH(h: number) {
    let x = this.state.x;
    let fn = this.state.fn;
    let newState = Object.assign({}, this.state); // React does NOT like you mutating the state directly so I have to do this copying monstrosity from SO: https://stackoverflow.com/questions/45557301/how-to-change-the-state-with-react-typescript-2-0
    let rise = evaluate(fn,{x:x+h}) - evaluate(fn,{x:x}); // y1 - y2 convenience var

    // this.state is decapitated from the namespace here for readability and convenience

    newState.options.data[1].vector = [h,0];
    // no need to change first offset, doesn't have an h val for calculation
    newState.options.data[2].vector = [0, rise];
    newState.options.data[2].offset = [x+h, evaluate(fn,{x:x})];
    newState.options.data[0].secants[0] = {
      x0: x,
      x1: x+h,
    }
    newState.slope = rise / h;
    // no need to change true slope, only changes with x
    
    newState.h = h;
    this.setState(newState);

    functionPlot(this.state.options);
  }

  changeX(x: number) {
    let h = this.state.h;
    let fn = this.state.fn;
    let newState = Object.assign({}, this.state); // React does NOT like you mutating the state directly so I have to do this copying monstrosity from SO: https://stackoverflow.com/questions/45557301/how-to-change-the-state-with-react-typescript-2-0
    let rise = evaluate(fn,{x:x+h}) - evaluate(fn,{x:x}); // y1 - y2 convenience var
    // Again this.state is decapitated from the namespace here for readability and convenience


    // no need to change first vector, doesn't use x
    newState.options.data[1].offset = [x,evaluate(fn,{x:x})];
    newState.options.data[2].vector = [0, evaluate(fn,{x:x+h}) - evaluate(fn,{x:x})];
    newState.options.data[2].offset = [x+h, evaluate(fn,{x:x})];
    newState.options.data[0].secants[0] = {
      x0: x,
      x1: x+h,
    }
    newState.slope = rise / h;
    newState.trueSlope = evaluate(newState.derivative, {x:x});
    newState.x = x;
    this.setState(newState);

    functionPlot(this.state.options);
  }

  render() {
    return(
      <div id ="container">
      <div id = {this.state.graphRoot}></div>
      <div id = "inputs">
      <div id="slopes">
      <h2 id = "calcslope"> {"Calculated Slope: " + Math.round((this.state.slope + Number.EPSILON) * 1000) / 1000} </h2>
      <h2 id = "trueslope"> {"True Slope: " + Math.round((this.state.trueSlope + Number.EPSILON) * 1000) / 1000} </h2> 
      </div>
      <div id="sliders">
      <div className = "barVal">
      <h3 id = "hlabel"> {"h: " + this.state.h} </h3>
      <input type="range" id ="hslider" name = "h" min="0.01" max="10" step="0.01" defaultValue = {this.props.h} onChange={(event) => this.changeH(parseFloat(event.target.value))}>
      </input>
      </div>
      <div className = "barVal">
      <h3 id = "xlabel"> {"x: " + this.state.x} </h3>
      <input type = "range" id="xslider" name = "x" min = "-10" max = "10" step ="0.01" defaultValue = {this.props.x} onChange={(event) => this.changeX(parseFloat(event.target.value))}></input>
      </div>
      </div>
      <input type="text" id="editing" defaultValue = {this.props.fn} onChange={(event) => this.changeFn(event.target.value)}>
      </input>
      </div>
      </div>
    );
  }
}
ReactDOM.render(
  <div>
    <h1> The Derivative </h1>
    <p> If </p>
    <TeX math="m = \frac{y_1 - y_2}{x_1 - x_2}" block/>
    <HGraph fn={fn} h={h} x={x} graphRoot={graphRoot} options={hOptions}/>
    <AGraph fn={fn} a={10} x={x} graphRoot = {aGraphRoot} options={aOptions}/>
  </div>,
  document.getElementById('root')
);
functionPlot(hOptions); // Ideally we would get the initial call inside the class, but idk how
functionPlot(aOptions);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
