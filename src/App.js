import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from './history';
import TaxForm from './pages/TaxForm';
import TaxDetail from './pages/TaxDetail';
import './App.css';

function App() {
  return (
    <div className="ui raised very padded text container segment" data-test="component-app">
      <h1 className="ui header">Tax Calculator - Rodrigo Okuta</h1>
      {/* create history to be accessed anywhere in the application */}
      <Router history={history}>
        <Switch>
          <Route path="/tax-detail">
            <TaxDetail />
          </Route>
          <Route path="/">
            <TaxForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
