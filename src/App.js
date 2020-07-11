import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import DataPage from './DataPage'

import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <div>
        <div className="title">COVID-19 STATS 01.05.20 - 01.07.20</div>
        <ul className="nav">
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName='active' to="/highest-number-cases">Top 10 countries (highest number cases)</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName='active' to="/highest-increase-rate">Top 10 countries with highest increase rate</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName='active' to="/most-stable">Top 10 most stable countries (most moderate changes)</NavLink>
          </li>
        </ul>

        <Switch>
          <Route path="/highest-number-cases">
            <DataPage param="number-cases" />
          </Route>
          <Route path="/highest-increase-rate">
            <DataPage param="increase-rate" />
          </Route>
          <Route path="/most-stable">
            <DataPage param="stable" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
