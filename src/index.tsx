import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import functionPlot from 'function-plot';



let options = {
  target: '#root',
  data: [{
    fn: 'x^2'
  }]
}

class Update extends React.Component {
  changeOptions() {
    if (options.data[0].fn === 'x^2') {
      options.data[0].fn = 'x';
    }
    else {
      options.data[0].fn = 'x^2';
    }
    functionPlot(options);
  }

  render() {
    return(
      <button onClick={this.changeOptions}>
        hi
      </button>
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
