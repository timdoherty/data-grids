import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import ReactDataGrid from './ReactDataGrid';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Link to="/react-data-grid">React Data Grid</Link>
          <Route path="/react-data-grid" component={ReactDataGrid} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
