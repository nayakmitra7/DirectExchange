import React, { Component } from "react";
import MyOfferHeader from "./MyOfferHeader";
import Navbar from "../Navbar/navbar";
class CounterMade extends Component {
  state = {
    navarr: ["black","black","black","rgb(0, 106, 255)","black"],

  };
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <MyOfferHeader navarr={this.state.navarr}></MyOfferHeader>
        <p>CounterMade</p>
      </div>
    );
  }
}

export default CounterMade;
