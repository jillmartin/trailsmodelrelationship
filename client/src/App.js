import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import axios from 'axios';

import './App.css';
import Login from './Login';
import TrailsList from './TrailsList';
import TrailsDetails from './TrailsDetails';
import TrailsUpdate from './TrailsUpdate';

class App extends Component {
  
  render() {
    
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/" component={TrailsList}/>
          <Route exact path="/trails/:id" component={TrailsDetails}/>
          <Route exact path="/trails/edit/:id" component={TrailsUpdate}/>
        </Switch>
      </Router>
    )
  };
};
export default App;
