import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Link to="/primereact">PrimeReact</Link>
          <Route path="/primereact" component={PrimeReact} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
