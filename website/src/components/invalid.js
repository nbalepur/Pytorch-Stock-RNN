import React, { Component } from "react";

class Invalid extends Component {
  state = {};

  isVowel = (c) => {
    return c === "a" || c === "e" || c === "i" || c === "o" || c === "u";
  };

  render() {
    return (
      <div class="row">
        <div class="col-sm-12" align="center">
          <br />
          <br />
          <h2 style={{ color: "white" }}>
            Please enter {this.isVowel(this.props.label.charAt(0)) ? "an" : "a"}{" "}
            <span style={{ color: "#d83853" }}>{this.props.label}</span> input
          </h2>
        </div>
      </div>
    );
  }
}

export default Invalid;
