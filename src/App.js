import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import AgGrid from './routes/ag-grid';
import PrimeReact from "./routes/primereact";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Link to="/primereact">PrimeReact</Link> |
          <Route path="/primereact" component={PrimeReact} />
          <Link to="/ag-grid">agGrid</Link>
          <Route path="/ag-grid" component={AgGrid} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
