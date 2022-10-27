import React from 'react';
import DerivativeComp from './derivativecomp';
import Integral from './integral'
import { Switch, Route, Link } from 'react-router-dom';


const App = () => (
  <div className='app'>
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/derivative' component={DerivativeComp}></Route>
      <Route exact path='/integral' component={Integral}></Route>
    </Switch>  </div>
);

export default App;
