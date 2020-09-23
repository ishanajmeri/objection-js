import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './routes/Routes';
import './App.css';

const browserHistory = createBrowserHistory();

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
