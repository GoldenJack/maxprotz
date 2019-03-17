import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Layout from 'features/Layout';

import Home from 'features/Home';
import Login from 'features/Login';
import Profile from 'features/Profile';
// import NotFound from 'features/NotFound';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        {/* <Route component={NotFound} /> */}
      </Layout>
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);
