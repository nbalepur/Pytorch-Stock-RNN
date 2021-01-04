import React, { Component } from "react";

import { test_data } from "./test.js";

import Loss from "./loss.js";
import Predict from "./predict.js";
import TrainTest from "./traintest.js";

class Stock extends Component {
  state = {
    display: "loss",
  };

  componentDidMount() {
    console.log(test_data);
  }

  render() {
    return (
      <div>
        <ul
          class="nav nav-tabs nav-fill"
          style={{ backgroundColor: "#17223b" }}
        >
          <li class="nav-item">
            <h5
              class={
                "nav-link" +
                (this.state.display === "loss" ? " nav-link-active" : "")
              }
              onClick={() => {
                this.setState({ display: "loss" });
              }}
            >
              Loss Visualization
            </h5>
          </li>
          <li class="nav-item">
            <h5
              class={
                "nav-link" +
                (this.state.display === "traintest" ? " nav-link-active" : "")
              }
              onClick={() => {
                this.setState({ display: "traintest" });
              }}
            >
              Training and Testing Sets
            </h5>
          </li>
          <li class="nav-item">
            <h5
              class={
                "nav-link" +
                (this.state.display === "predict" ? " nav-link-active" : "")
              }
              onClick={() => {
                this.setState({ display: "predict" });
              }}
            >
              Future Predictions
            </h5>
          </li>
        </ul>
        <br />
        {this.state.display === "loss" ? (
          <Loss
            values={test_data.loss.values}
            labels={test_data.loss.labels}
            loss={test_data.loss.final}
          />
        ) : this.state.display === "predict" ? (
          <Predict />
        ) : (
          <TrainTest
            all={test_data.all}
            train={test_data.train}
            test={test_data.test}
          />
        )}

        <br />
      </div>
    );
  }
}

export default Stock;
