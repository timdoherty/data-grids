import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";

import "./App.css";

import KendoReact from "./routes/kendoreact";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Link to="/kendoreact">KendoReact</Link>
          <Route path="/kendoreact" component={KendoReact} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
