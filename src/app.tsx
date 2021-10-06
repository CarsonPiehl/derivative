import React from 'react';
import DerivativeComp from './derivativecomp';
import Integral from './integral'
import { Switch, Route, Link } from 'react-router-dom';


const App = () => (
  <div className='app'>
    <Link to="/derivative">
      <h1> DERIVATIVE </h1>
    </Link>
    <Link to="/integral">
      <h1> INTEGRAL </h1>
    </Link>
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/derivative' component={DerivativeComp}></Route>
      <Route exact path='/integral' component={Integral}></Route>
    </Switch>  </div>
);

export default App;