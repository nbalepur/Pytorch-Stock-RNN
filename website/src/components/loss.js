import React, { Component } from "react";

import { Line } from "react-chartjs-2";

class Loss extends Component {
  state = {};
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-xl-12" align="center">
            <br />
            <h1 style={{ color: "white" }}>
              This model achieved a loss of{" "}
              <span style={{ color: "#e94560" }}>{this.props.loss}</span>
            </h1>
            <br />
            <br />
            <h3 style={{ color: "white" }}>
              Loss Visualization Over 100 Epochs
            </h3>
            <br />
            <Line
              data={{
                labels: this.props.labels,
                datasets: [
                  {
                    data: this.props.values,
                    fill: false,
                    borderColor: "#e94560",
                  },
                ],
              }}
              options={{
                legend: {
                  display: false,
                },

                scales: {
                  yAxes: [
                    {
                      gridLines: {
                        display: true,
                        color: "#0F3460",
                      },
                      ticks: {
                        fontColor: "#c9c9c9",
                      },
                      scaleLabel: {
                        display: true,
                        labelString: "Loss",
                        fontColor: "white",
                        fontSize: 20,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                        color: "#0F3460",
                      },
                      ticks: {
                        fontColor: "#c9c9c9",
                      },
                      scaleLabel: {
                        display: true,
                        labelString: "Epoch Number",
                        fontColor: "white",
                        fontSize: 20,
                      },
                    },
                  ],
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Loss;
