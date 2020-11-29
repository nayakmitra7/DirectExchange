import React, { Component } from "react";
import MyOfferHeader from "./MyOfferHeader";
import Navbar from "../Navbar/navbar";

class CloseOffer extends Component {
  state = {
    navarr: ["black", "rgb(0, 106, 255)"],
  };
  render() {
    return (
      <div>
        <Navbar className="mb-3"></Navbar>

        <MyOfferHeader navarr={this.state.navarr}></MyOfferHeader>
      </div>
    );
  }
}

export default CloseOffer;
