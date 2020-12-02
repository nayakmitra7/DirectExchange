import React, { Component } from "react";
import MyOfferHeader from "./MyOfferHeader";
import Navbar from "../Navbar/navbar";
class CounterReceived extends Component {
  state = {
    navarr: ["black", "black", "black", "black", "rgb(0, 106, 255)"],
  };
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <MyOfferHeader navarr={this.state.navarr}></MyOfferHeader>
        <p>CounterReceived</p>
      </div>
    );
  }
}

export default CounterReceived;
