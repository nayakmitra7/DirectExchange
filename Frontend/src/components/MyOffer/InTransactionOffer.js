import React, { Component } from 'react';
import MyOfferHeader from "./MyOfferHeader";
import Navbar from "../Navbar/navbar";
class InTransactionOffer extends Component {
    state = { navarr: ["black", "black","rgb(0, 106, 255)"] }
    render() { 
        return ( <div>
              <Navbar></Navbar>
        <MyOfferHeader navarr={this.state.navarr}></MyOfferHeader>
        </div> );
    }
}
 
export default InTransactionOffer;