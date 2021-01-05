import React, { Component } from "react";

import Countdown from "react-countdown";

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <h1 class="blinking" style={{ color: "#e94560", fontSize: 50 }}>
        0
      </h1>
    );
  } else {
    return <h1 style={{ color: "#e94560", fontSize: 50 }}>{seconds}</h1>;
  }
};

class TimeOut extends Component {
  state = {};

  calcNearestMinute = () => {
    let numSeconds = Math.round(60 - new Date().getSeconds());
    return Date.now() + 1000 * numSeconds;
  };

  render() {
    return (
      <div class="row">
        <div class="col-sm-12" align="center">
          <br />
          <br />
          <h2 style={{ color: "white" }}>
            You have maxed out your API calls from{" "}
            <a
              class="stock-link"
              href={"https://www.alphavantage.co"}
              target="blank"
              rel="noreferrer"
            >
              Alpha Vantage
            </a>
          </h2>
          <br></br>
          <h2 style={{ color: "white" }}>Please try again in:</h2>
          <br></br>
          <Countdown
            date={this.calcNearestMinute()}
            renderer={renderer}
          ></Countdown>
        </div>
      </div>
    );
  }
}

export default TimeOut;
