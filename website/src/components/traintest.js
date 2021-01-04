import React, { Component } from "react";

import Chart from "chart.js";

import "@djthoms/pretty-checkbox";

class TrainTest extends Component {
  state = {
    lineChart: null,
  };

  handleCheckBox = () => {
    let trainChecked = document.getElementById("train-checkbox").checked;
    let testChecked = document.getElementById("test-checkbox").checked;

    let lineChart = this.state.lineChart;
    let datasets = lineChart.data.datasets;

    if (trainChecked && testChecked) {
      datasets[0].data = this.props.all.pred;
      datasets[1].data = this.props.all.act;
      lineChart.data.labels = this.props.all.labels;
    } else if (trainChecked) {
      datasets[0].data = this.props.train.pred;
      datasets[1].data = this.props.train.act;
      lineChart.data.labels = this.props.train.labels;
    } else if (testChecked) {
      datasets[0].data = this.props.test.pred;
      datasets[1].data = this.props.test.act;
      lineChart.data.labels = this.props.test.labels;
    } else {
      datasets[0].data = [];
      datasets[1].data = [];
      lineChart.data.labels = [];
    }

    lineChart.data.datasets = datasets;

    lineChart.update();
  };

  componentDidMount() {
    let ctx = document.getElementById("train-test-line");

    let lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.props.all.labels,
        datasets: [
          {
            label: "Predicted",
            data: this.props.all.pred,
            fill: false,
            borderColor: "#e94560",
          },
          {
            label: "Actual",
            data: this.props.all.act,
            fill: false,
            borderColor: "#4190c4",
          },
        ],
      },
      options: {
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
      },
    });

    this.setState({ lineChart: lineChart });
  }

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
              <div class="col-md-5"></div>
              <div
                class="col-md-2"
                style={{
                  backgroundColor: "#0F3460",
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                {" "}
                <h5 style={{ color: "white" }}>Set Selection:</h5>
              </div>

              <div class="col-md-5"></div>
              <div class="col-md-5"></div>
              <div
                class="col-md-1"
                style={{
                  backgroundColor: "#0F3460",
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  borderBottomLeftRadius: 20,
                }}
              >
                <div className="pretty p-default p-round p-smooth">
                  <input
                    type="checkbox"
                    id="train-checkbox"
                    defaultChecked={true}
                    onChange={this.handleCheckBox}
                  />
                  <div className="state">
                    <label style={{ color: "white" }}>Train</label>
                  </div>
                </div>
              </div>
              <div
                class="col-md-1"
                style={{
                  backgroundColor: "#0F3460",
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderBottomRightRadius: 20,
                }}
              >
                <div className="pretty p-default p-round p-smooth">
                  <input
                    type="checkbox"
                    id="test-checkbox"
                    defaultChecked={true}
                    onChange={this.handleCheckBox}
                  />
                  <div className="state">
                    <label style={{ color: "white" }}>Test</label>
                  </div>
                </div>
              </div>
              <div class="col-md-5"></div>
            </div>
            <br />
            <canvas id="train-test-line" />
          </div>
        </div>
      </div>
    );
  }
}

export default TrainTest;
