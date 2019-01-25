import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import './App.css';
import AgGrid from './routes/ag-grid';
import KendoReact from './routes/kendoreact';
import PrimeReact from './routes/primereact';
import FixedData2 from './routes/fixedData2';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Link to="/fixedData2">Fixed Data Table 2</Link> |
          <Route path="/fixedData2" component={FixedData2} />
          <Link to="/primereact">PrimeReact</Link> |
          <Route path="/primereact" component={PrimeReact} />
          <Link to="/kendoreact">KendoReact</Link> |
          <Route path="/kendoreact" component={KendoReact} />
          <Link to="/ag-grid">agGrid</Link>
          <Route path="/ag-grid" component={AgGrid} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
