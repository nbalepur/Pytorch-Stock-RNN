import React, { Component } from "react";

import "./App.css";

import Header from "./components/header.js";
import InfoTiles from "./components/info-tiles.js";
import Invalid from "./components/invalid.js";
import ErrorTicker from "./components/ticker-error.js";
import Stock from "./components/stock.js";
import TimeOut from "./components/timeout.js";

import axios from "axios";

class App extends Component {
  state = {
    componentState: "begin",
    data: null,
    stock: "TSLA",
    loading: false,
    loadingState: "data",
    url: "",
    progress: 0,
    progressInc: 4.54,
  };

  componentDidMount() {
    document.body.style = "background: #1a1a2e";
  }

  handleAPIPredictRequest = () => {
    this.setState({ progress: this.state.progress + this.state.progressInc });

    this.setState({ loadingState: "predict" });
    axios.get(this.state.url + "/predict").then((response) => {
      let data = response.data;

      this.setState({ data: data });
      this.setState({ componentState: "valid" });

      this.setState({ loading: false });
    });
  };

  handleAPITrainRequest = async (count) => {
    if (count === 0) {
      this.setState({ loadingState: "train" });
    }

    if (count === 20) {
      this.handleAPIPredictRequest();
    }

    this.setState({ progress: this.state.progress + this.state.progressInc });

    axios.get(this.state.url + "/train").then((response) => {
      let data = response.data;

      if (!data.error_exists) {
        this.handleAPITrainRequest(count + 1);
      }
    });
  };

  handleAPIDataRequest = (stock) => {
    this.setState({ progress: 0 });
    this.setState({ loading: true });
    this.setState({ loadingState: "data" });

    this.setState({ stock: stock });

    this.setState({ progress: this.state.progress + this.state.progressInc });

    axios.post(this.state.url + "/data", { stock: stock }).then((response) => {
      let data = response.data;

      if (data.error_exists) {
        this.setState({ componentState: data.error });
        this.setState({ loading: false });
      } else {
        this.handleAPITrainRequest(0);
      }
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
      this.handleAPIDataRequest(stock);
    }
  };

  getComponentFromState = () => {
    let compState = this.state.componentState;

    if (this.state.loading) {
      return "";
    }

    if (compState === "empty") {
      return <Invalid label="non-empty" />;
    } else if (compState === "nonalpha") {
      return <Invalid label="alphabetical" />;
    } else if (compState === "begin") {
      return <InfoTiles />;
    } else if (compState === "api") {
      return <TimeOut />;
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
          loadingState={this.state.loadingState}
          stock={this.state.stock}
          isValid={this.state.componentState === "valid"}
          progress={this.state.progress}
        />
        {this.getComponentFromState()}
      </div>
    );
  }
}

export default App;
