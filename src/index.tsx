import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import functionPlot from 'function-plot';
import {derivative} from 'mathjs';


let options = {
  target: '#root',
  data: [
    { fn: 'x',
      color: 'steelblue',
      derivative: {
        fn: '1',
        updateOnMouseMove: true,
        color: '#000000',
      },
    },
    {
      fn: 'x',
      color: 'steelblue',
      derivative: {
        fn:'0',
        updateOnMouseMove: true,
        color: '#000000',
      },
    },
  ]
}

class Update extends React.Component {
  changeOptions() {
    try {
      let textbox = document.getElementById("editing") as HTMLInputElement;
      if (textbox.value !== '') {
        options.data[0].fn = textbox.value;
        options.data[1].fn = textbox.value;
        let compDerivative = derivative(textbox.value, 'x').toString();
        options.data[0].derivative.fn = compDerivative;
      }
      functionPlot(options);
    }
    catch(err) {
      console.log(err);
    }
  }

  render() {
    return(
      <input type="text" id="editing" onInput={() => this.changeOptions()}>
      </input>
    );
  }
}
functionPlot(options);



ReactDOM.render(
  <React.StrictMode>
    <Update />
  </React.StrictMode>,
  document.getElementById('moot')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
