import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import RouteWithLayout from './routeWithLayouts';
import MainLayout from '../layout/layout';
import Login from '../views/login/login';
import NotFound from '../views/not-found/not-found';
import Dashboard from '../views/dashboard/dashboard';
import WeeklyTest from '../views/weeklyTest/weeklyTest';
import Tests from '../views/alltests/tests';
import MeritTest from '../views/meritTest/MeritTest';
import Question from '../views/question/question';
import TestEnd from '../views/alltests/testend';

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
        component={MeritTest}
        exact
        layout={MainLayout}
        path="/merittest"
      />
      <RouteWithLayout
        component={Tests}
        exact
        layout={MainLayout}
        path="/test"
      />
      <RouteWithLayout
        component={TestEnd}
        exact
        layout={MainLayout}
        path="/testend"
      />
      <RouteWithLayout
        component={Question}
        exact
        layout={MainLayout}
        path="/question/:id"
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
