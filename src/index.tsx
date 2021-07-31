import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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
let riseRoot1 = 'riseroot1';
let riseRoot2 = 'riseroot2';
let ballGraph = 'ballshaha';
let ballSecantGraph = 'funnyballshaha2';

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
      points: [

      ],
      graphType: 'scatter' as 'scatter',
      fnType: 'points' as 'points',
    },
    {
      fn: 'sin(x)',
      skipTip: true,
      nSamples: 100,
      graphType: 'scatter' as 'scatter',
    }

  ]
}

let ballSecantOptions = {
  target: '#'+ballSecantGraph,
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
      points: [ // Secant indication point

      ],
      graphType: 'scatter' as 'scatter',
      fnType: 'points' as 'points',
    },
    {
      fn: 'cos(x)',
      skipTip: true,
      nSamples: 100,
      graphType: 'scatter' as 'scatter',
      secants: [

      ]
    },
    {
      points: [ // Tiny LIne

      ],
      graphType: 'polyline' as 'polyline',
      fnType: 'points' as 'points',
    }

  ]
}

let basicOptions = {
  target: '#basicGraph',
  grid: true,
  width: 800,
  height: 500,
  data: [
    {
      points: [

      ] as number[][],
      graphType: 'polyline' as 'polyline',
      fnType: 'points' as 'points',
    },
    { // h vector
      vector: [1,0],
      offset: [3,8],
      graphType: 'polyline' as 'polyline',
      fnType: 'vector' as 'vector',
    },
    { // f(x+h) - f(x) vector
      vector: [0, 4],
      offset: [4, 8],
      graphType: 'polyline' as 'polyline',
      fnType: 'vector' as 'vector',
    },

  ]
}

let increment = 20/500;
let bigArray = [];
for(let i:number = 0; i < 500; i++) {

  let curX = -10 + i*increment;
  let curY;
  if (curX < 2) {
    curY = evaluate('x^2',{x:curX}) as number;
  }
  else {
    curY = evaluate('4x-4',{x:curX});
  }
  let array = [curX,curY] as number[];
  bigArray.push(array);
}
basicOptions.data[0].points = bigArray;


// Number Rounding function
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
  tangentX: number,
  endX: number,
  ticks: number,
  graphRoot: string,
}

interface ballPropsSecant {
  fn: string,
  derivative: string,
  secantDist: number,
  options: any,
  startX: number,
  tangentX: number,
  endX: number,
  ticks: number,
  graphRoot: string,
}

interface basicProps {
  options: any,
}

interface discontinuityGraph {
  fn: string,
  discontinuity: number,
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
  tangent: string,
  tangentX: number,
  options: any,
  tick: number,
  on: boolean,
  increment: number,
}

interface ballStateSecant {
  fn: string,
  derivative: string,
  tangent: string,
  secantDist: number,
  tangentX: number,
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

  componentDidMount() {
    functionPlot(aOptions);
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

  componentDidMount() {
    functionPlot(hOptions);
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
    let rise = evaluate(fn,{x:(x+h)}) - evaluate(fn,{x:x}); // y1 - y2 convenience var

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
    let rise = evaluate(fn,{x:(x+h)}) - evaluate(fn,{x:x}); // y1 - y2 convenience var
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
//       <TeX className="math" math={"m_calculated \\: = \\:" + round(this.state.slope) + "\\: = \\frac{ \\color{#4682b4}" + round(evaluate(this.state.fn,{x:this.state.x+h})) + "\\: color{#000} - \\: \\color{#b47846}" + round(evaluate(this.state.fn,{x:this.state.x})) + "}{" + this.state.h  + "} \\: ~ \\: m_true \\: = \\: " + this.state.trueSlope} block/>

  render() {
    let mathString = String("m_{calculated} \\: = \\:" + round(this.state.slope) + "\\: = \\frac{\\color{#4682b4}" + round(evaluate(this.state.fn,{x:(this.state.x+this.state.h)})) + "\\color{#000} - \\: \\color{#b47846}" + round(evaluate(this.state.fn,{x:this.state.x})) + "\\color{#000}}{\\color{#bd3c4b}" + this.state.h  + "} \\: ~ \\: m_{true} \\: = \\: " + this.state.trueSlope);
    return(
      <div id ="container">
      <div id = {this.state.graphRoot} onLoad={() => functionPlot(this.state.options)}></div>
      <div id = "inputs">
      <div id="slopes">
      <TeX className="math" math={mathString} block/>
      </div>
      <div id="sliders">
      <div className = "barVal">
      <h3 id = "hlabel"> {"h: " + this.state.h} </h3>
      <input type="range" id ="hslider" name = "h" min="0.1" max="10" step="0.1" defaultValue = {this.props.h} onChange={(event) => this.changeH(parseFloat(event.target.value))}>
      </input>
      </div>
      <div className = "barVal">
      <h3 id = "xlabel"> {"x: " + this.state.x} </h3>
      <input type = "range" id="xslider" name = "x" min = "-10" max = "10" step ="0.1" defaultValue = {this.props.x} onChange={(event) => this.changeX(parseFloat(event.target.value))}></input>
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

  componentDidMount() {
    functionPlot(riseRunOptions1);
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

  componentDidMount() {
    functionPlot(riseRunOptions2);
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

class BallFunction extends React.Component<ballProps, ballState> {

  public state:ballState = {
    fn: this.props.fn,
    derivative: this.props.derivative,
    tangent: evaluate(this.props.derivative,{x:this.props.tangentX}) + 'x + ' + (evaluate(this.props.fn,{x:this.props.tangentX}) - evaluate(this.props.derivative,{x:this.props.tangentX})*this.props.tangentX),
    tangentX: this.props.tangentX,
    options: this.props.options,
    tick: 0,
    on: false,
    increment: Math.abs(this.props.endX - this.props.startX)/this.props.ticks,
  }

  componentDidMount() {
    functionPlot(ballOptions);
  }

  
  handleToggle() { // Deprecated cuz I made something better
    if(this.state.on === false) {
      this.turnOn();
    }
    else {
      this.turnOff();
    }
  }

  reset(fn = "joebiden") {
    let resState = Object.assign({}, this.state);
    if (fn !== "joebiden") {
      resState.fn = fn;
      resState.options.data[0].fn = fn;
      resState.options.data[2].fn = fn;
      resState.derivative = derivative(fn,'x').toString();
      resState.tangent = evaluate(resState.derivative,{x:resState.tangentX}) + 'x + ' + (evaluate(resState.fn,{x:resState.tangentX}) - evaluate(resState.derivative,{x:resState.tangentX})*resState.tangentX)
    }
    resState.options.data[0].points = [[this.props.startX,evaluate(resState.fn,{x:this.props.startX})]];
    resState.tick = 0;
    resState.on = false;
    this.setState(resState);
    functionPlot(this.state.options);
  }

  stateExec(num:number) {
    console.log("set state executed " + num);
    console.log(this.state.options.data[0].fn)
    console.log(this.state.fn)
  }

  changeFn(fn:string) {
    try {
      if (fn !== '') {
        this.reset(fn);
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  changeTanX(tanX:number) {
    try {
      let tangent = evaluate(this.state.derivative,{x:tanX}) + 'x + ' + (evaluate(this.state.fn,{x:tanX}) - evaluate(this.state.derivative,{x:tanX})*tanX);
      let newScatter = [];
      let curX;
      let curY;
      for(let i:number = 0; i < this.props.ticks; i++) {

        let curX = this.props.startX + i*this.state.increment;
        if (curX < tanX) {
          curY = evaluate(this.state.fn,{x:curX});
        }
        else {
          break;
        }
        newScatter.push([curX,curY]);
      }
      curX = 100000; // Arbitrarily far, todo?: Not just arbitrarily far?
      curY = evaluate(tangent,{x:curX});
      newScatter.push([curX,curY]);


      let newState = Object.assign({}, this.state); 
      newState.tangent = tangent;
      newState.tangentX = tanX;
      newState.options.data[0].points = newScatter;
      newState.options.data[1].points = [[tanX, evaluate(tangent,{x:tanX})]]
      this.setState(newState);
      functionPlot(this.state.options);
    }
    catch(e) {
      console.log(e);
    }
  }

  turnOn() { // Deprecated cuz I made something better
    let newState = Object.assign({}, this.state); 
    if (evaluate(this.props.derivative,{x:this.state.tangentX}) === 0) {
      newState.tangent = String((evaluate(this.state.fn,{x:this.state.tangentX}) - evaluate(this.state.derivative,{x:this.state.tangentX})*this.state.tangentX));
    }
    newState.options.data[1].points = [[this.state.tangentX,evaluate(this.state.fn,{x:this.state.tangentX})]];
    newState.on = true;
    newState.tick++;
    this.setState(newState);
    functionPlot(this.state.options);
    requestAnimationFrame(this.update.bind(this));
    // From https://stackoverflow.com/questions/4011793/this-is-undefined-in-javascript-class-methods
  
  }

  turnOff() { // Deprecated cuz I made something better
    let newState = Object.assign({}, this.state);     
    newState.on = false;
    this.setState(newState);
  }

  update() { // Deprecated cuz I made something better
    if (this.state.on) {
      let newState = Object.assign({}, this.state);     
      if (this.state.tick < this.props.ticks) {
        let curX = this.props.startX + (this.state.increment*this.state.tick);
        console.log(curX);
        let curY;
        console.log(evaluate(this.state.tangent,{x:curX}));
        if (curX > this.state.tangentX) {
          console.log(evaluate(this.state.tangent,{x:curX}));
          curY = evaluate(this.state.tangent,{x:curX});
        }
        else {
          curY = evaluate(this.state.fn,{x:curX});
        }
        newState.options.data[0].points.push([curX,curY]);
        newState.tick+=1;
        console.log(this.state.tangent);
        this.setState(newState);
        //console.log(this.state.options.data[0].points.length)
        functionPlot(this.state.options);
        //console.log(this.state.options.data[0].points.length)
        requestAnimationFrame(this.update.bind(this));
      }
      else {
        newState.on = false;
        this.setState(newState);
      }
    }
  }

  render() {
    return(
    <div>
      <div id={this.props.graphRoot}></div>
      <input type={'text'} onChange= {(event) => this.changeFn(event.target.value)} defaultValue={this.props.fn}></input>
      <input type={'range'} onChange= {(event) => this.changeTanX(parseFloat(event.target.value))} defaultValue={this.props.tangentX} min={this.props.startX} max={this.props.endX} step={this.state.increment}></input>
    </div>
    )
  }

}


class BallFunctionSecant extends React.Component<ballPropsSecant, ballStateSecant> { //TODO: Initial graphing stuff so you dont have to pull on a knob to get something done (AKA Story of my Life)

  public state:ballStateSecant = {
    fn: this.props.fn,
    derivative: this.props.derivative,
    secantDist: this.props.secantDist,
    tangent: evaluate(this.props.derivative,{x:this.props.tangentX}) + 'x + ' + (evaluate(this.props.fn,{x:this.props.tangentX}) - evaluate(this.props.derivative,{x:this.props.tangentX})*this.props.tangentX),
    tangentX: this.props.tangentX,
    options: this.props.options,
    tick: 0,
    on: false,
    increment: Math.abs(this.props.endX - this.props.startX)/this.props.ticks,
  }

  componentDidMount() {
    functionPlot(ballSecantOptions);
  }
  
  handleToggle() {
    if(this.state.on === false) {
      this.turnOn();
    }
    else {
      this.turnOff();
    }
  }

  reset(fn = "joebiden") {
    let resState = Object.assign({}, this.state);
    if (fn !== "joebiden") {
      resState.fn = fn;
      resState.options.data[0].fn = fn;
      resState.options.data[2].fn = fn;
      resState.derivative = derivative(fn,'x').toString();
      resState.tangent = evaluate(resState.derivative,{x:resState.tangentX}) + 'x + ' + (evaluate(resState.fn,{x:resState.tangentX}) - evaluate(resState.derivative,{x:resState.tangentX})*resState.tangentX)
    }
    resState.options.data[0].points = [[this.props.startX,evaluate(resState.fn,{x:this.props.startX})]];
    resState.tick = 0;
    resState.on = false;
    this.setState(resState);
    functionPlot(this.state.options);
  }

  stateExec(num:number) {
    console.log("set state executed " + num);
    console.log(this.state.options.data[0].fn)
    console.log(this.state.fn)
  }

  changeFn(fn:string) {
    try {
      if (fn !== '') {
        this.reset(fn);
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  changeTanX(tanX:number) {
    try {
      let tangent = evaluate(this.state.derivative,{x:tanX}) + 'x + ' + (evaluate(this.state.fn,{x:tanX}) - evaluate(this.state.derivative,{x:tanX})*tanX);
      let newScatter = [];
      let curX, curY;
      for(let i:number = 0; i < this.props.ticks; i++) {

        let curX = this.props.startX + i*this.state.increment;
        if (curX < tanX) {
          curY = evaluate(this.state.fn,{x:curX});
        }
        else {
          break;
        }
        newScatter.push([curX,curY]);
      }
      curX = 100000; // Arbitrarily far, todo?: Not just arbitrarily far?
      curY = evaluate(tangent,{x:curX});
      newScatter.push([curX,curY]);


      let newState = Object.assign({}, this.state); 
      newState.tangent = tangent;
      newState.tangentX = tanX;
      newState.options.data[0].points = newScatter;
      newState.options.data[1].points = [[tanX, evaluate(tangent,{x:tanX})]]
      let point1 = [newState.tangentX-newState.secantDist, evaluate(newState.fn,{x:newState.tangentX-newState.secantDist})];
      let point2 = [newState.tangentX+newState.secantDist, evaluate(newState.fn,{x:newState.tangentX+newState.secantDist})];
      newState.options.data[3].points = [];
      newState.options.data[3].points.push(point1);
      newState.options.data[3].points.push(point2);
      newState.options.data[2].secants = [{x0: point1[0], x1: point2[0]}];

      this.setState(newState);
      functionPlot(this.state.options);
    }
    catch(e) {
      console.log(e);
    }
  }

  changeSecantDist(newDist:number) {
    try {
      let newState = Object.assign({}, this.state); 
      newState.secantDist = newDist;
      let point1 = [newState.tangentX-newDist, evaluate(newState.fn,{x:newState.tangentX-newDist})];
      let point2 = [newState.tangentX+newDist, evaluate(newState.fn,{x:newState.tangentX+newDist})];
      newState.options.data[3].points = [];
      newState.options.data[3].points.push(point1);
      newState.options.data[3].points.push(point2);
      newState.options.data[2].secants = [{x0: point1[0], x1: point2[0]}];
      this.setState(newState);
      functionPlot(this.state.options);
    }
    catch(er) {
      console.log(er);
    }
  }

  turnOn() {
    let newState = Object.assign({}, this.state); 
    if (evaluate(this.props.derivative,{x:this.state.tangentX}) === 0) {
      newState.tangent = String((evaluate(this.state.fn,{x:this.state.tangentX}) - evaluate(this.state.derivative,{x:this.state.tangentX})*this.state.tangentX));
    }
    newState.options.data[1].points = [[this.state.tangentX,evaluate(this.state.fn,{x:this.state.tangentX})]];
    newState.on = true;
    newState.tick++;
    this.setState(newState);
    functionPlot(this.state.options);
    requestAnimationFrame(this.update.bind(this));
    // From https://stackoverflow.com/questions/4011793/this-is-undefined-in-javascript-class-methods
  
  }

  turnOff() {
    let newState = Object.assign({}, this.state);     
    newState.on = false;
    this.setState(newState);
  }

  update() {
    if (this.state.on) {
      let newState = Object.assign({}, this.state);     
      if (this.state.tick < this.props.ticks) {
        let curX = this.props.startX + (this.state.increment*this.state.tick);
        console.log(curX);
        let curY;
        console.log(evaluate(this.state.tangent,{x:curX}));
        if (curX > this.state.tangentX) {
          console.log(evaluate(this.state.tangent,{x:curX}));
          curY = evaluate(this.state.tangent,{x:curX});
        }
        else {
          curY = evaluate(this.state.fn,{x:curX});
        }
        newState.options.data[0].points.push([curX,curY]);
        newState.tick+=1;
        console.log(this.state.tangent);
        this.setState(newState);
        //console.log(this.state.options.data[0].points.length)
        functionPlot(this.state.options);
        //console.log(this.state.options.data[0].points.length)
        requestAnimationFrame(this.update.bind(this));
      }
      else {
        newState.on = false;
        this.setState(newState);
      }
    }
  }

  render() {
    return(
    <div>
      <div id={this.props.graphRoot}></div>
      <input type={'text'} onChange= {(event) => this.changeFn(event.target.value)} defaultValue={this.props.fn}></input>
      <input type={'range'} onChange= {(event) => this.changeTanX(parseFloat(event.target.value))} defaultValue={0} min={this.props.startX} max={this.props.endX} step={this.state.increment}></input>
      <input type={'range'} onChange= {(event) => this.changeSecantDist(parseFloat(event.target.value))} defaultValue={this.props.secantDist} min={0.1} max={5} step={0.1}></input>
    </div>
    )
  }

}


class BasicDiscontinuityGraph extends React.Component<discontinuityGraph> {
  componentDidMount() {
    let options = {
      target: '#' + this.props.graphRoot,
      grid: true,
      width: 800,
      height: 500,
      data: [
        { // function
          fn: this.props.fn,
          color: 'steelblue',
        },
        {
          points: [
            [this.props.discontinuity as number, evaluate(this.props.fn,{x:this.props.discontinuity}) as number]
          ],
          graphType: 'scatter' as 'scatter',
          fnType: 'points' as 'points',
          color: '#f7022a',
        }
      ]
    }
    

    functionPlot(options);
  }

  render() {
    return(
      <div id={this.props.graphRoot}>
      </div>
    )
  }
}

class BasicGraph extends React.Component<basicProps> {

  componentDidMount() {
    functionPlot(this.props.options);
  }

  render() {
    return( // .slice() is to remove the # as the first bit
      <div id={this.props.options.target.slice(1)}>
      </div>
    )
  }

}





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
    <p> We can see this geometrically. We can imagine the function like a ball on a string, tracking the function. If the string is cut, the ball should move in a straight line in the same direction it was moving right before the string was cut.</p>
    <BallFunction fn={"sin(x)"} derivative={'cos(x)'} options={ballOptions} startX = {-10} tangentX = {Math.PI/2} endX = {10} ticks = {500} graphRoot={ballGraph}></BallFunction>
    <p> If we want to find the line the ball should go in at any point, using a line between two points will not really work because the line of the ball only intersects the function at one point, right when the string is cut. </p>
    <BallFunctionSecant fn={'cos(x)'} derivative='-sin(x)' secantDist={5} options={ballSecantOptions} startX={-10} endX = {10} tangentX={Math.PI/2} ticks={500} graphRoot={ballSecantGraph}></BallFunctionSecant>
    <p> If we zoom in close enough on any of the two point lines, we'll see that they don't exactly mirror their one point counterparts. They are always a little bit higher or lower, or have a different slope. This is a fundamental property of these two point lines, which are called secants. They will never quite match the one point lines, or tangents.</p>
    <p> The closer the two points get to each other (and the point for the tangent), the closer their line is to the real path of our hypothetical ball. </p>
    <p> Lets take this pattern we notice to its conclusion. What if we just had 0 distance between the points? That would solve the issue of having two points represent a line with one intersection. </p>
    <TeX className="math" math="\frac{1-1}{1-1} = \frac{0}{0}" block/>
    <p> If there is 0 distance between the points, they'll just be the same, and we’ll always have to divide by zero. Lets do a little algebra and see if we can represent how the slope of the line changes based on the distance between the two points. </p>
    <p> Our normal slope equation is: </p>
    <TeX className="math" math="\frac{y_2 - y_1}{x_2 - x_1}" block/>
    <p> We want to turn this into an equation with just two variables. The point, and the distance between it and the second point.  </p>
    <p> First, lets do some easy substitution. We know that:  <TeX className="math" math="y_2 = f(x_2)"/> and  <TeX className="math" math="y_1 = f(x_1)"/> We can remove the two y variables just by making this substitution.</p>
    <p> Next, lets just define the distance between the two x's to be h. That gets rid of another variable. <TeX className="math" math="h = x_2 - x_1" block/></p>
    <p> After we replace the Ys with our new function notation, and the bottom difference with our new variable h, we end up with this equation: </p>
    <TeX className="math" math="\frac{f(x_2) - f(x_1)}{h}" block/>
    <p> We still want only one point, so lets rewrite the first term of the function notation. x2 is just x1 + h (the distance between the two points). We can do this algebraically as well if we add  <TeX className="math" math="x_1"/> to each side of the definition of h: <TeX className="math" math="x_2 = h + x_1" block /> </p>
    <p> Once we substitute <TeX className="math" math="x_2"/> , our new equation is: </p>
    <TeX className="math" math="\frac{f(x_1+h) - f(x_1)}{h}" block/>
    <p> This is exactly what we wanted! An equation with one x variable and one variable for the distance between the two points.</p>
    <p> Now that we have it, lets try it for some point and function. Lets try <TeX className="math" math="x=2"/> in the function <TeX className="math" math="f(x) = x^2"/>.</p>
    <p> Lets start out by substituting what we just said would be our example, <TeX className="math" math="x=2"/> and <TeX className="math" math="f(x) = x^2"/>, then do just a bit of algebra.</p>
    <TeX className="math" math="\frac{f(2+h)-f(2)}{h} = \frac{(h+2)^2 - 2^2}{h} = \frac{h^2+4h+4 - 4}{h}" block/>
    <p> The fours cancel out, and we are left with: </p>
    <TeX className="math" math="\frac{h^2+4h}{h}" block/>
    <p> Looking at this equation we can see that it is a pretty typical rational equation, dividing by the variable. This means there will always be a removable discontinuity at h = 0, because we can't divide by 0.</p>
    <p> Happily, though, we can cancel out the h!</p>
    <TeX className="math" math="\frac{h^2+4h}{h} = h+4" block/>
    <p> This is the equation for the calculated slope of <TeX className="math" math="f(x) = x^2  \; at \; x=2"/> based on how far away the second point is. We can graph it with the discontinuity: </p>
    <BasicDiscontinuityGraph fn={"x+4"} graphRoot={"discontinuity1"} discontinuity={0}></BasicDiscontinuityGraph>
    <p> Wait. Now that we have graphed it, does this remind us of anything? If we have any experience with discontinuities, we know how to find the what the value of x=0 would be without the discontinuity. We take the limit! </p>
    <p> The expected value at the point is just the limit of this equation, h+4, as h (the distance between points) goes to 0. We find out that the slope is 4, which is exactly the line our ball follows! </p>
    <BasicGraph options={basicOptions}></BasicGraph>
    <TeX className="math" math="m \: = \: 4 = \:  \frac{\color{#4682b4} 12 \: \color{#000} - \: \color{#b47846} 8}{\color{#4682b4}3 \: \color{#000} - \: \color{#b47846} 2}" block/>
    <p> This property isn't unique to x^2. For any function, as h gets closer to 0, we can see that our secant line approximates the true tangent more closely.</p>
    <HGraph fn={"x^2"} h={5} x={0} graphRoot={graphRoot} options={hOptions}></HGraph>
    <div className="keyTakeaway">
    <h2 className="takeawaytitle"> Key Takeaway - Limit Definition of Derivative </h2>
    <p> So, the full equation would be: </p>
    <TeX className="math" math="\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}" block/>
    <p> This is the limit definition of the derivative. </p>
    </div>
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

/*

functionPlot(hOptions); // Ideally we would get the initial call inside the class, but idk how
functionPlot(aOptions);
functionPlot(riseRunOptions1);
functionPlot(riseRunOptions2);
functionPlot(ballOptions);
functionPlot(ballSecantOptions);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);