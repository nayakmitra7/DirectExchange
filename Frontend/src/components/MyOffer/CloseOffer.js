import React, { Component } from "react";
import MyOfferHeader from "./MyOfferHeader";
import Navbar from "../Navbar/navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import "./Offer.css";
import Accordion from "react-bootstrap/Accordion";
import { address } from "../../js/helper/constant";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
class CloseOffer extends Component {
  state = {
    navarr: ["black", "rgb(0, 106, 255)","black","black","black"],
    closeOffers: [],
  };

  componentDidMount() {
    //change the id of user after kena complete
    axios
      .get(`${address}/offer/${localStorage.getItem("id")}/close`)
      .then((response) => {
        console.log(response.data);
        this.setState({ closeOffers: response.data });
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: false,
        });
      });
  }
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <MyOfferHeader navarr={this.state.navarr}></MyOfferHeader>
        <div className="margin-left-right-offer">
          {this.state.closeOffers.map((offer) => (
            // {offer.offerStatus==3?this.setState({offerStatus:"offer_expired"}):this.setState({offerStatus:"offer_accepted"}) }
            <Accordion.Toggle
              as={Card.Header}
              eventKey="0"
              className="gray-auto-matching"
              key={offer.id}
              className={"offer" + offer.offerStatus}
            >
              <ListGroup.Item
                variant="secondary"
                className="list-group-style-auto-matching "
              >
                <Row className="header-bold-auto-matching ">
                  <Col>Offer ID</Col>
                  <Col>Username</Col>
                  <Col>Country(des)</Col>
                  <Col>Amount(des)</Col>
                  <Col>Amount(src)</Col>
                  <Col>Country(src)</Col>
                  <Col>Exp Date</Col>
                  <Col>Offer Status</Col>
                </Row>
                <Row>
                  <Col>#{offer.id}</Col>
                  <Col>{offer.nickname}</Col>
                  <Col>{offer.destinationCountry}</Col>
                  <Col>{offer.amountInDes} {offer.destinationCurrency}</Col>
                  <Col>{offer.amountInSrc} {offer.sourceCurrency}</Col>
                  <Col>{offer.sourceCountry}</Col>
                  <Col>{offer.expirationDate}</Col>
                  {offer.offerStatus == 2 ? (
                    <Col style={{ color: "green" }}>Fulfilled</Col>
                  ) : (
                    <Col style={{ color: "red" }}>Expired</Col>
                  )}
                </Row>
              </ListGroup.Item>
            </Accordion.Toggle>
          ))}
        </div>
      </div>
    );
  }
}

export default CloseOffer;
