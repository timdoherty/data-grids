import React, { Component } from "react";
import { BrowserRouter, Link, Route } from 'react-router-dom';

import logo from "./logo.svg";
import "./App.css";
import AgGrid from './routes/ag-grid';
import ReactDataGrid from "./routes/react-data-grid";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/react-data-grid">React Data Grid</Link>
          <Route path="/react-data-grid" component={ReactDataGrid} />
          <Link to="/ag-grid">agGrid</Link>
          <Route path="/ag-grid" component={AgGrid} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
