import React, { Component } from "react";

import { Line } from "react-chartjs-2";

class Predict extends Component {
  state = {};
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-xl-12" align="center">
            <br />
            <h3 style={{ color: "white" }}>Future Predictions</h3>
            <br />
            <Line
              data={{
                labels: this.props.labels,
                datasets: [
                  {
                    data: this.props.past,
                    fill: false,
                    borderColor: "#e94560",
                    label: "Past Values",
                  },
                  {
                    data: this.props.future,
                    fill: false,
                    borderColor: "#4190c4",
                    label: "Future Prediction",
                  },
                ],
              }}
              options={{
                legend: {
                  labels: {
                    fontColor: "white",
                    fontSize: 15,
                  },
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
                        labelString: "Normalized Closing Price",
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
                        labelString: "Time",
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

export default Predict;
