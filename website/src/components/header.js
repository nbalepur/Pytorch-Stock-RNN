import React, { Component } from "react";

class Header extends Component {
  state = {};
  render() {
    return (
      <div id="header-div" style={{ backgroundColor: "#17223b" }}>
        <div class="container">
          <br></br>
          <br></br>
          <br></br>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8" align="center">
              <h1 style={{ color: "white", fontSize: 50 }}>
                RNN Stock Predictor
              </h1>
              <h4 style={{ color: "white" }}>
                Type in your stock ticker symbol to get started!
              </h4>
              <br></br>

              <div class="col-md-6">
                <div class="input-group">
                  <input
                    type="text"
                    id="stock-input"
                    class="form-control"
                    placeholder="TSLA, AAPL, etc."
                    aria-label="TSLA, AAPL, etc."
                    aria-describedby="basic-addon2"
                  />
                  <div class="input-group-append" style={{ marginLeft: 5 }}>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={this.props.handlePredictStock}
                    >
                      Predict!
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-2"></div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          {this.props.loading && (
            <div class="col-md-12" align="center">
              <h2 class="sr-only" style={{ color: "white" }}>
                Training Neural Network for{" "}
                <a
                  class="stock-link"
                  href={
                    "https://www.marketwatch.com/investing/fund/" +
                    this.props.stock.toLowerCase()
                  }
                  target="blank"
                  rel="noreferrer"
                >
                  {this.props.stock.toUpperCase()}
                </a>{" "}
              </h2>{" "}
              <span class="spinner-border"></span>
              <br></br>
              <br></br>
            </div>
          )}
          {!this.props.loading && this.props.isValid && (
            <div class="col-md-12" align="center">
              <h2 style={{ color: "white" }}>
                Showing Results for:{" "}
                <span>
                  <a
                    class="stock-link"
                    href={
                      "https://www.marketwatch.com/investing/fund/" +
                      this.props.stock.toLowerCase()
                    }
                    target="blank"
                    rel="noreferrer"
                  >
                    {this.props.stock.toUpperCase()}
                  </a>
                </span>{" "}
              </h2>{" "}
              <br></br>
              <br></br>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
