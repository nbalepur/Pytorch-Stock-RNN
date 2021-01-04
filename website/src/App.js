import React, { Component } from "react";

import "./App.css";

import Header from "./components/header.js";
import InfoTiles from "./components/info-tiles.js";
import Invalid from "./components/invalid.js";
import ErrorTicker from "./components/ticker-error.js";
import Stock from "./components/stock.js";

import axios from "axios";

class App extends Component {
  state = {
    componentState: "begin",
    data: null,
    stock: "TSLA",
    loading: false,
  };

  componentDidMount() {
    document.body.style = "background: #1a1a2e";
  }

  handleAPIRequest = (stock) => {
    this.setState({ loading: true });
    this.setState({ stock: stock });

    axios.get("http://127.0.0.1:5000/predict/" + stock).then((response) => {
      let data = response.data;

      if (data.error_exists) {
        this.setState({ componentState: data.error });
      } else {
        this.setState({ data: data });
        this.setState({ componentState: "valid" });
      }

      this.setState({ loading: false });
    });
  };

  handlePredictStock = () => {
    let stock = document.getElementById("stock-input").value;
    stock = stock.replace(/\s/g, "");

    if (stock.length === 0) {
      this.setState({ componentState: "empty" });
    } else if (!/^[a-zA-Z]+$/.test(stock)) {
      this.setState({ componentState: "nonalpha" });
    } else {
      this.handleAPIRequest(stock);
    }
  };

  getComponentFromState = () => {
    let compState = this.state.componentState;

    if (compState === "empty") {
      return <Invalid label="non-empty" />;
    } else if (compState === "nonalpha") {
      return <Invalid label="alphabetical" />;
    } else if (compState === "begin") {
      return <InfoTiles />;
    } else if (compState === "ticker") {
      return <ErrorTicker stock={this.state.stock} />;
    } else {
      return <Stock data={this.state.data} stock={this.state.stock} />;
    }
  };

  render() {
    return (
      <div>
        <Header
          handlePredictStock={this.handlePredictStock}
          loading={this.state.loading}
          stock={this.state.stock}
          isValid={this.state.componentState === "valid"}
        />
        {this.getComponentFromState()}
      </div>
    );
  }
}

export default App;
