import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Authorization } from 'context';
import { useUsers } from 'hooks';
import Layout from 'features/Layout';

import Home from 'features/Home';
import Login from 'features/Login';
import Profile from 'features/Profile';
import Novetly from 'features/Novetly';
// import NotFound from 'features/NotFound';

const Routes = () => {
  const { ...props } = useUsers();

  return (
    <Authorization.Provider value={{
      ...props
    }}
    >
      <Route path="/login" component={Login} />
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/news/:id" component={Novetly} />
        {/* <Route component={NotFound} /> */}
      </Layout>
    </Authorization.Provider>
  );
};

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Routes />
    </Switch>
  </HashRouter>,
  document.getElementById('root'));
