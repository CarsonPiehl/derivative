import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import functionPlot from 'function-plot';
import {derivative,evaluate} from 'mathjs';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import App from './app';
import { BrowserRouter } from 'react-router-dom';



ReactDOM.render((
  <BrowserRouter>
    <App /> {/* The various pages will be displayed by the `Main` component. */}
  </BrowserRouter>
  ), document.getElementById('root')
);