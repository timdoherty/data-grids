import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import AgGrid from './routes/ag-grid';
import ReactDataGrid from './routes/react-data-grid';
import KendoReact from './routes/kendoreact';
import PrimeReact from './routes/primereact';

const Separator = () => <span style={{ padding: '0 5px' }}>|</span>;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div style={{ display: 'flex' }}>
            <Link to="/primereact">PrimeReact</Link>
            <Separator />
            <Link to="/react-data-grid">React Data Grid</Link>
            <Separator />
            <Link to="/kendoreact">KendoReact</Link>
            <Separator />
            <Link to="/ag-grid">agGrid</Link>
          </div>
          <Route path="/primereact" component={PrimeReact} />
          <Route path="/react-data-grid" component={ReactDataGrid} />
          <Route path="/kendoreact" component={KendoReact} />
          <Route path="/ag-grid" component={AgGrid} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
