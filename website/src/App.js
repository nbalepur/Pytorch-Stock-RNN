import React, { Component } from "react";

import "./App.css";

import Header from "./components/header.js";

import Brain from "./images/brain.png";

class App extends Component {
  state = {};

  componentDidMount() {
    document.body.style = "background: #1a1a2e";
  }

  render() {
    return (
      <div>
        <Header />
        <img
          alt={"brain"}
          src={Brain}
          style={{ width: 250, height: 250 }}
        ></img>
      </div>
    );
  }
}

export default App;
