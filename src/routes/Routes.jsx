import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import RouteWithLayout from './routeWithLayouts';
import MainLayout from '../layout/layout';
import Login from '../views/login/login';
import NotFound from '../views/not-found/not-found';
import Dashboard from '../views/dashboard/dashboard';
import WeeklyTest from '../views/weeklyTest/weeklyTest';
import Tests from '../views/alltests/tests';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={Login}
        exact
        layout={MainLayout}
        path="/login"
      />
      <RouteWithLayout
        component={Dashboard}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={WeeklyTest}
        exact
        layout={MainLayout}
        path="/weeklytest"
      />
      <RouteWithLayout
        component={Tests}
        exact
        layout={MainLayout}
        path="/test"
      />
      <Redirect from="/" exact to="/login" />

      <RouteWithLayout
        component={NotFound}
        expact
        layout={MainLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
