import React, { Component } from "react";

import { Line } from "react-chartjs-2";

class TrainTest extends Component {
  state = {
    act: this.props.all.act,
    pred: this.props.all.pred,
    labels: this.props.all.labels,
  };

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-xl-12" align="center">
            <br />
            <h3 style={{ color: "white" }}>
              Stock Training and Testing Set Visualization
            </h3>
            <br />
            <div class="row">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </div>
            <br />
            <Line
              data={{
                labels: this.state.labels,
                datasets: [
                  {
                    label: "Predicted",
                    data: this.state.pred,
                    fill: false,
                    borderColor: "#e94560",
                  },
                  {
                    label: "Actual",
                    data: this.state.act,
                    fill: false,
                    borderColor: "#ff96a8",
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
                        stepSize: 0.1,
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
                        maxTicksLimit: 30,
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

export default TrainTest;
