import React, { Component } from "react";

import Brain from "../images/brain.png";
import Stock from "../images/stock.png";
import Predict from "../images/predict.png";

class InfoTiles extends Component {
  state = {};

  render() {
    return (
      <div>
        <div class="row">
          <div class="col-md-4" align="center">
            <br />
            <img
              class="hover-image"
              src={Brain}
              alt="brain"
              style={{ width: 250, height: 250 }}
            ></img>
          </div>
          <div class="col-md-4" align="center">
            <br />
            <img
              class="hover-image-delay"
              src={Stock}
              alt="stock"
              style={{ width: 250, height: 250 }}
            ></img>
          </div>
          <div class="col-md-4" align="center">
            <br />
            <img
              class="hover-image"
              src={Predict}
              alt="predict"
              style={{ width: 250, height: 250 }}
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoTiles;
