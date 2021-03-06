import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import './App.css';
import AgGrid from './routes/ag-grid';
import ReactDataGrid from './routes/react-data-grid';
import KendoReact from './routes/kendoreact';
import PrimeReact from './routes/primereact';
import FixedData2 from './routes/fixedData2';

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
            <Separator />
            <Link to="/fixedData2">Fixed Data Table 2</Link>
          </div>

          <Route path="/primereact" component={PrimeReact} />
          <Route path="/react-data-grid" component={ReactDataGrid} />
          <Route path="/kendoreact" component={KendoReact} />
          <Route path="/ag-grid" component={AgGrid} />
          <Route path="/fixedData2" component={FixedData2} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
