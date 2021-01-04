import React, { Component } from "react";

class ErrorTicker extends Component {
  state = {};
  render() {
    return (
      <div class="row">
        <div class="col-sm-12" align="center">
          <br />
          <br />
          <h2 style={{ color: "white" }}>
            We could not find a stock that matches{" "}
            <span style={{ color: "#d83853" }}>
              {this.props.stock.toUpperCase()}
            </span>
          </h2>
          <h2 style={{ color: "white" }}>
            Please check your input and try again
          </h2>
        </div>
      </div>
    );
  }
}

export default ErrorTicker;
