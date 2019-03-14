import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Basic from 'templates/Basic';

import Home from 'features/Home';
import Login from 'features/Login';
import Profile from 'features/Profile';
// import NotFound from 'features/NotFound';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Basic>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        {/* <Route component={NotFound} /> */}
      </Basic>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
