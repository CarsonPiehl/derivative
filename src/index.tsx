import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import functionPlot from 'function-plot';
import {derivative,evaluate} from 'mathjs';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import { request } from 'http';

let fn = 'x*x';
let h = 5;
let x = 0;
let graphRoot = 'hgraph';
let aGraphRoot = 'agraph';
let riseRoot1 = 'riseroot1';
let riseRoot2 = 'riseroot2';
let ballGraph = 'ballshaha'

let riseRunOptions1 = {
  target: '#' + riseRoot1,
  grid: true,
  width: 800,
  height: 500,
  data: [
    { // function
      fn: '2x',
      color: 'steelblue',
    },
    { // x vector THIS IS ALL HARD TYPED. TODO: FIX
      vector: [10,0],
      offset: [0,0],
      graphType: 'polyline' as 'polyline',
      fnType: 'vector' as 'vector',
    },
    { // y vector
      vector: [0, 20],
      offset: [10, 0],
      graphType: 'polyline' as 'polyline',
      fnType: 'vector' as 'vector',
    },
  ]
}

let riseRunOptions2 = {
  target: '#' + riseRoot2,
  grid: true,
  width: 800,
  height: 500,
  data: [
    { // function
      fn: 'x^2',
      color: 'steelblue',
    },
    { // x vector THIS IS ALL HARD TYPED. TODO: FIX
      vector: [1000,0],
      offset: [0,0],
      graphType: 'polyline' as 'polyline',
      fnType: 'vector' as 'vector',
    },
    { // y vector
      vector: [0, 2000],
      offset: [1000, 0],
      graphType: 'polyline' as 'polyline',
      fnType: 'vector' as 'vector',
    },
  ]
}


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

let ballOptions = {
  target: '#'+ballGraph,
  grid: true,
  width: 800,
  height: 500,
  data: [
    { // ball line
      points: [

      ],
      graphType: 'polyline' as 'polyline',
      fnType: 'points' as 'points',
    },
    { 
      fn: '2x'
    },

  ]

}

function round(number:number) {
  return Math.round((number + Number.EPSILON) * 1000) / 1000;
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

interface riseRunProps {
  fn: string,
  derivative: string,
  x2: number,
  x1: number,
  graphRoot: string,
  options: any,
}

interface ballProps {
  fn: string,
  derivative: string,
  options: any,
  startX: number,
  endX: number,
  ticks: number,
  graphRoot: string,
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

interface riseRunState {
  fn: string,
  derivative: string,
  x2: number,
  x1: number,
  options: any,
}

interface ballState {
  fn: string,
  derivative: string,
  options: any,
  tick: number,
  on: boolean,
  increment: number,
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
      <div id = {this.state.graphRoot} onLoad={() => functionPlot(this.state.options)}></div>
      <div id = "inputs">
      <div id="slopes">
      <h2 id = "calcslope"> {"Calculated Slope: " + round(this.state.slope)} </h2>
      <h2 id = "trueslope"> {"True Slope: " + round(this.state.trueSlope)} </h2> 
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


class HGraph extends React.Component<hGraphProps>  { // State is just props (but we will change it) for now, no need to use different interfaces
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
      <div id = {this.state.graphRoot} onLoad={() => functionPlot(this.state.options)}></div>
      <div id = "inputs">
      <div id="slopes">
      <h2 id = "calcslope"> {"Calculated Slope: " + round(this.state.slope)} </h2>
      <h2 id = "trueslope"> {"True Slope: " + round(this.state.trueSlope)} </h2> 
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


class RiseRunStatic extends React.Component<riseRunProps> {
  public state:riseRunState = {
    fn: this.props.fn,
    derivative: this.props.derivative,
    x2: this.props.x2,
    x1: this.props.x1,
    options: this.props.options
  }

  changeX2(x: number) {
    let fn = this.state.fn;
    let x1 = this.state.x1;
    let x2 = x;
    let newState = Object.assign({}, this.state); // React does NOT like you mutating the state directly so I have to do this copying monstrosity from SO: https://stackoverflow.com/questions/45557301/how-to-change-the-state-with-react-typescript-2-0
    let rise = evaluate(fn,{x:x2}) - evaluate(fn,{x:x1}); // y1 - y2 convenience var
    // Again this.state is decapitated from the namespace here for readability and convenience
    
    
    newState.options.data[1].vector = [x2-x1,0];
    // no need to change first offset doesn't use x2
    newState.options.data[2].vector = [0, rise];
    newState.options.data[2].offset = [x2, evaluate(fn,{x:x1})];
    newState.x2 = x2;

    this.setState(newState);

    functionPlot(this.state.options);
  }

  changeX1(x: number) {
    let fn = this.state.fn;
    let x1 = x;
    let x2 = this.state.x2;
    let newState = Object.assign({}, this.state); // React does NOT like you mutating the state directly so I have to do this copying monstrosity from SO: https://stackoverflow.com/questions/45557301/how-to-change-the-state-with-react-typescript-2-0
    let rise = evaluate(fn,{x:x2}) - evaluate(fn,{x:x1}); // y1 - y2 convenience var
    // Again this.state is decapitated from the namespace here for readability and convenience


    newState.options.data[1].vector = [x2-x1,0];
    newState.options.data[1].offset = [x1,evaluate(fn,{x:x1})]
    newState.options.data[2].vector = [0, rise];
    newState.options.data[2].offset = [x2, evaluate(fn,{x:x1})];
    newState.x1 = x1;

    this.setState(newState);

    functionPlot(this.state.options);

  }



  render() {
    return(
      <div>
        <div id={this.props.graphRoot} onLoad={() => functionPlot(this.props.options)}></div>
        <TeX className="math" math = {"m = " + round((evaluate(this.state.fn,{x:this.state.x2}) - evaluate(this.state.fn,{x:this.state.x1})) / (this.state.x2 - this.state.x1)) + "\\: = \\:" + "\\frac{\\color{#4682b4}" + round(evaluate(this.state.fn,{x:this.state.x2})) + "\\color{#000} \\: - \\: \\color{#b47846}" + round(evaluate(this.state.fn,{x:this.state.x1})) + "\\color{#000}}{\\color{#4682b4}" + this.state.x2 + "\\color{#000} \\: - \\: \\color{#b47846}" + this.state.x1 +"}"} block/>
        <input type = "range" id="x1slider" name = "x" min = "-10" max = "10" step ="0.1" defaultValue = {this.props.x1} onChange={(event) => this.changeX1(parseFloat(event.target.value))}></input>
        <input type = "range" id="x2slider" name = "x" min = "-10" max = "10" step ="0.1" defaultValue = {this.props.x2} onChange={(event) => this.changeX2(parseFloat(event.target.value))}></input>

      </div>
    )
  }
}

class RiseRunAntiStatic extends React.Component<riseRunProps> {
  public state:riseRunState = {
    fn: this.props.fn,
    derivative: this.props.derivative,
    x2: this.props.x2,
    x1: this.props.x1,
    options: this.props.options
  }

  changeFn(fn: string) {
    try {
      let x1 = this.state.x1;
      let x2 = this.state.x2;

      let newState = Object.assign({}, this.state); // React does NOT like you mutating the state directly so I have to do this copying monstrosity from SO: https://stackoverflow.com/questions/45557301/how-to-change-the-state-with-react-typescript-2-0
      let rise = evaluate(fn,{x:x2}) - evaluate(fn,{x:x1}); // y1 - y2 convenience var
      // Again this.state is decapitated from the namespace here for readability and convenience


      
      newState.options.data[1].vector = [x2-x1,0];
      newState.options.data[1].offset = [x1,evaluate(fn,{x:x1})];
      // no need to change first offset doesn't use x2
      newState.options.data[2].vector = [0, rise];
      newState.options.data[2].offset = [x2, evaluate(fn,{x:x1})];
      newState.fn = fn;
      newState.options.data[0].fn = fn;
      newState.derivative = derivative(fn,'x').toString();

      this.setState(newState);

      functionPlot(this.state.options);
    }
    catch(err) {
      console.log(err);
    }
  }

  changeX2(x: number) {
    let fn = this.state.fn;
    let x1 = this.state.x1;
    let x2 = x;
    let newState = Object.assign({}, this.state); // React does NOT like you mutating the state directly so I have to do this copying monstrosity from SO: https://stackoverflow.com/questions/45557301/how-to-change-the-state-with-react-typescript-2-0
    let rise = evaluate(fn,{x:x2}) - evaluate(fn,{x:x1}); // y1 - y2 convenience var
    // Again this.state is decapitated from the namespace here for readability and convenience
    
    
    newState.options.data[1].vector = [x2-x1,0];
    // no need to change first offset doesn't use x2
    newState.options.data[2].vector = [0, rise];
    newState.options.data[2].offset = [x2, evaluate(fn,{x:x1})];
    newState.x2 = x2;

    this.setState(newState);

    functionPlot(this.state.options);
  }

  changeX1(x: number) {
    let fn = this.state.fn;
    let x1 = x;
    let x2 = this.state.x2;
    let newState = Object.assign({}, this.state); // React does NOT like you mutating the state directly so I have to do this copying monstrosity from SO: https://stackoverflow.com/questions/45557301/how-to-change-the-state-with-react-typescript-2-0
    let rise = evaluate(fn,{x:x2}) - evaluate(fn,{x:x1}); // y1 - y2 convenience var
    // Again this.state is decapitated from the namespace here for readability and convenience


    newState.options.data[1].vector = [x2-x1,0];
    newState.options.data[1].offset = [x1,evaluate(fn,{x:x1})]
    newState.options.data[2].vector = [0, rise];
    newState.options.data[2].offset = [x2, evaluate(fn,{x:x1})];
    newState.x1 = x1;

    this.setState(newState);

    functionPlot(this.state.options);

  }



  render() {
    return(
      <div>
        <div id={this.props.graphRoot} onLoad={() => functionPlot(this.props.options)}></div>
        <TeX className="math" math = {"m = " + round((evaluate(this.state.fn,{x:this.state.x2}) - evaluate(this.state.fn,{x:this.state.x1})) / (this.state.x2 - this.state.x1)) + "\\: = \\:" + "\\frac{\\color{#4682b4}" + round(evaluate(this.state.fn,{x:this.state.x2})) + "\\color{#000} \\: - \\: \\color{#b47846}" + round(evaluate(this.state.fn,{x:this.state.x1})) + "\\color{#000}}{\\color{#4682b4}" + this.state.x2 + "\\color{#000} \\: - \\: \\color{#b47846}" + this.state.x1 +"}" } block />
        <input type = "range" id="x1slider" name = "x" min = "-10" max = "10" step ="0.1" defaultValue = {this.props.x1} onChange={(event) => this.changeX1(parseFloat(event.target.value))}></input>
        <input type = "range" id="x2slider" name = "x" min = "-10" max = "10" step ="0.1" defaultValue = {this.props.x2} onChange={(event) => this.changeX2(parseFloat(event.target.value))}></input>
        <input type = "text" id ="fninput" defaultValue = {this.props.fn} onChange = {(event) => this.changeFn(event.target.value)}></input>
      </div>
    )
  }
}
 // TODO: FIGURE OUT WHY THE FX PLOT IS NOT UPDATING
 // MAYBE BECAUSE OF ASYNC SET STATE? TRY DIRECTLY UPDATING AND SEE IF IT FIXES IT
class BallFunction extends React.Component<ballProps> {
  public state:ballState = {
    fn: this.props.fn,
    derivative: this.props.derivative,
    options: this.props.options,
    tick: 0,
    on: false,
    increment: Math.abs(this.props.endX - this.props.startX)/this.props.ticks,
  }
  
  handleToggle() {
    if(this.state.on === false) {
      this.turnOn();
    }
    else {
      this.turnOff();
    }
  }

  turnOn() {
    let newState = Object.assign({}, this.state);     
    newState.on = true;
    newState.options.data[0].points.push(this.props.startX,evaluate(this.state.fn,{x:this.props.startX}));
    newState.tick++;
    this.setState(newState, () => this.update());
    functionPlot(this.state.options);
    // From https://stackoverflow.com/questions/4011793/this-is-undefined-in-javascript-class-methods
  
  }

  turnOff() {
    let newState = Object.assign({}, this.state);     
    newState.on = false;
    this.setState(newState);
  }

  reset() {

  }

  update() {
    console.log('di')
    if (this.state.on) {
      let newState = Object.assign({}, this.state);     
      if (this.state.tick < this.props.ticks) {
        let preOptions = this.state.options;
        let curX = this.props.startX + (this.state.increment*this.state.tick);
        let curY = evaluate(this.state.fn,{x:curX});
        preOptions.data[0].points.push([curX,curY]);
        newState.options = preOptions;
        newState.tick++;
        functionPlot(newState.options);
        this.setState(newState, () => requestAnimationFrame(this.update.bind(this)));
      }
      else {
        newState.tick = 0;
        newState.options.data[0].points = [];
        newState.on = false;
        this.setState(newState);
      }
    }
  }

  render() {
    return(
    <div>
      <div id={this.props.graphRoot} onLoad={() => functionPlot(this.props.options)}></div>
      <button onClick={() => this.handleToggle()}> {String(this.state.on)} </button>
    </div>
    )
  }

}

// <HGraph fn={'x^2'} h={5} x={0} graphRoot={graphRoot} options={hOptions}></HGraph>


ReactDOM.render(
  <div>
    <h1> The Derivative </h1>
    <p> You’re probably already familiar with the concept of slope. Slope is a simple number that describes the steepness or slant of a specific line. Mathematically, you’ve probably seen it defined as: </p>
    <TeX className="math" math="m = \frac{y_1 - y_2}{x_1 - x_2}" block/>
    <p> Or: </p>
    <TeX className="math" math="m = \frac{\Delta y}{\Delta x}" block/>
    <p> Or: </p>
    <TeX className="math" math="m = \frac{Rise}{Run}" block/>
    <p> Slope is useful for a variety of reasons. We can figure out what speed, a car for example, is moving at by finding the slope between two points in time for the car.  
    <br></br><br></br> At 1:00 PM, the car was sitting in a garage, but by 3:00 PM, the car had traveled 100 miles. How fast was the car moving? </p>
    <TeX className="math" math="m = \frac{100\: miles\: - \:0\:miles}{3 \: hours \: - \: 0 \: hours} = \frac{50\:miles}{hour}" block /> 
    <p> For lines, the whole domain has the same slope, one of their fundamental qualities. The line 2x, for example, has the same slope of 2, no matter what point we look at. </p>
    <div id='riseruns'> 
    <RiseRunStatic fn={"2x"} derivative={'2'} x2={5} x1={0} options={riseRunOptions1} graphRoot={riseRoot1}></RiseRunStatic>
    </div>
    <p> For lines, we know the slope at every point because it was the same as any other! But for other functions, we don’t. Can we find it? </p>
    <p> Maybe we can use the same equation that works for lines on the more complex curves? </p>
    <RiseRunAntiStatic fn={"x^2"} derivative={'2x'} x2={5} x1={0} options={riseRunOptions2} graphRoot={riseRoot2}></RiseRunAntiStatic>
    <p> We quickly notice a few problems with this approach. First of all, what points do we pick? If we want to find the slope at x=1, do we pick x=1 and x=2? x=0 and x=2? </p>
    <p> An even bigger problem makes itself clear too. No matter what two points we pick, the slope at the point won’t be quite right. </p>
    <p> We can see this geometrically. We can imagine the function like a ball on a string, tracking the function. If the string is cut, the ball should move in a straight line in the same direction it was moving right before the string was cut. If we want to find the line the ball should go in at any point, using a line between two points will not really work because the line of the ball only intersects the function at one point, right when the string is cut. </p>
    <BallFunction fn={"x^2"} derivative={'2x'} options={ballOptions} startX = {-10} endX = {10} ticks = {500} graphRoot={ballGraph}></BallFunction>
    <p> We can see something though. The closer the two points get to each other, the closer their line is to the real path of our hypothetical ball. </p>
    <p> Maybe we can just make the two points the same one! That would solve the issue of having two points represent a line with one intersection. </p>
    <TeX className="math" math="\frac{1-1}{1-1} = \frac{0}{0}" block/>
    <p> Oh! If the two points are the same, we’ll always have to divide by zero. Maybe we could graph the calculated slope at each point?</p>
    <p> Our normal slope equation is: </p>
    <TeX className="math" math="\frac{y_2 - y_1}{x_2 - x_1}" block/>
    <p> We can rewrite this to an equation based on one point and how far away the second point is with some function notation. </p>
    <p> Our new equation is: </p>
    <TeX className="math" math="\frac{f(x_1+h) - f(x_1)}{h}" block/>
    <p> where h is the difference between the two point's x-coordinates, x2 - x1</p>
    <p> As we can see, x1 + x2 - x1 is just equal to x2, so this equation simplifies down to our same slope equation, but with function notation instead of Ys</p>
    <p> Lets graph this for x=2 in x^2. If we do a little math: </p>
    <TeX className="math" math="\frac{f(2+h)-f(2)}{h} = \frac{h^2+4h+4 - 4}{h}" block/>
    <p> We need to remember that this means there is a discontinuity here, at h=0, but we can cut out the h. </p>
    <TeX className="math" math="\frac{h^2+4h}{h} = h+4" block/>
    <p> This is the equation for the calculated slope of x^2 based on how far away the points are. We can graph it with the discontinuity: </p>
    <p> Wait. Now that we have graphed it, does this remind us of anything? If we have any experience with discontinuities, we know how to find the value of x=0! We take the limit! </p>
    <p> The value at the point is just the limit of this equation, h+4, as h (the distance between points) goes to 0. We find out that the slope is 4, which is exactly the line our ball follows! </p>
    <p> So, the full equation would be: </p>
    <TeX className="math" math="\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}" block/>
    <p> This is the limit definition of the derivative. </p> 
    <p> Let’s summarize how we got here. We started off with our usual slope equation: </p>
    <TeX className="math" math="\frac{y_2 - y_1}{x_2 - x_1}" block/>
    <p> After playing around with it a little, we found that the closer the two points got to each other, the closer their line got to the line of our hypothetical ball. We realized that this approach wouldn’t really work to find the exact point because we would divide by zero when the points became the same. However, when we graphed the function of the slope, we could see that this division by zero was really just a removable discontinuity! </p> 
    <p> Because of this, we could take the limit and find what the value normally would be, and made our derivative function! </p>
    <p> Even though it looks a little complicated, its important to remember that the whole thing is just an excuse to push the two points as close together as possible. The limit, the function notation, all of it just helps us to push the points as close together as we can. </p>
    <p> So, what can we do with our new equation? </p> 
    <p> We can use it to find the slope at a specific point like we just did, but we can also use it to find a function. </p>
    <p> If we substitute x as a variable instead of as a specific number, we can do a little algebra, and find the function for the slope for every point in the previous equation. Let’s do it for x^2. </p>
    <TeX className="math" math="\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}" block/>
    <p> Let's take our original equation, then substitute a few things: </p>
    <TeX className="math" math="\lim_{h \to 0} \: \frac{(x+h)^2 - x^2}{h}" block />
    <TeX className="math" math="\lim_{h \to 0} \: \frac{x^2 +2xh + h^2 - x^2}{h}" block />
    <TeX className="math" math="\lim_{h \to 0} \: \frac{2xh + h^2}{h}" block/>
    <TeX className="math" math="\lim_{h \to 0} \: 2x + h" block/>
    <TeX className="math" math="2x" block/>
    <p> This equation fits with what we just did! @x=2 This equation gives us a slope of 4, which is exactly what we found. </p>
  </div>,
  document.getElementById('root')
);
functionPlot(hOptions); // Ideally we would get the initial call inside the class, but idk how
functionPlot(aOptions);
functionPlot(riseRunOptions1);
functionPlot(riseRunOptions2);
functionPlot(ballOptions);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();