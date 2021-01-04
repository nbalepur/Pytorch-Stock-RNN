import React, { Component } from "react";

import Loss from "./loss.js";
import Predict from "./predict.js";
import TrainTest from "./traintest.js";

class Stock extends Component {
  state = {
    display: "loss",
  };

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
            values={this.props.data.loss.values}
            labels={this.props.data.loss.labels}
            loss={this.props.data.loss.final}
          />
        ) : this.state.display === "predict" ? (
          <Predict
            past={this.props.data.all.act}
            future={this.props.data.future.values}
            labels={this.props.data.future.labels}
            stock={this.props.stock}
          />
        ) : (
          <TrainTest
            all={this.props.data.all}
            train={this.props.data.train}
            test={this.props.data.test}
          />
        )}

        <br />
      </div>
    );
  }
}

export default Stock;
