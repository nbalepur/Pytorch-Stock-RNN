import React, { Component } from "react";

class ErrorTicker extends Component {
  state = {};
  render() {
    return (
      <div class="row">
        <div class="col-sm-12" align="center">
          <h2 style={{ color: "white" }}>
            You have entered an invalid{" "}
            <span style={{ color: "#d83853" }}>stock ticker symbol</span>
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
