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
import Modal from 'react-bootstrap/Modal';
import { Spinner } from 'react-bootstrap';
class CloseOffer extends Component {
  state = {
    navarr: ["black", "rgb(0, 106, 255)", "black", "black", "black"],
    closeOffers: [],
    spinner:true
  };

  componentDidMount() {
    //change the id of user after kena complete
    axios
      .get(`${address}/offer/${localStorage.getItem("id")}/close`)
      .then((response) => {
        console.log(response.data);
        this.setState({ closeOffers: response.data, spinner:false });
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
        <Modal show={this.state.spinner} size="sm" centered>

          <Modal.Body>
            <Row>
              <Col></Col>
              <Col><div>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div ></Col>
              <Col></Col>
            </Row>

          </Modal.Body>

        </Modal>
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
