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

class MyOffer extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    navarr: ["rgb(0, 106, 255)", "black"],
    openOffers: [],
  };

  componentDidMount() {
    //change the id of user after kena complete
    axios
      .get(`${address}/offer/` + localStorage.getItem("id") + `/open`)
      .then((response) => {
        console.log(response.data);
        this.setState({ openOffers: response.data });
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: false,
        });
      });
  }
  autoMatch = (id) => {
    localStorage.setItem("autoMatchId",id);
    this.props.history.push('/autoMatching')
  }
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <MyOfferHeader navarr={this.state.navarr}></MyOfferHeader>
        <div className="margin-left-right-offer">
          {this.state.openOffers.map((offer) => (
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
                  <Col></Col>
                </Row>
                <Row>
                  <Col>#{offer.id}</Col>
                  <Col>{offer.nickname}</Col>
                  <Col>{offer.destinationCountry}</Col>
                  <Col>{offer.amountInDes} {offer.destinationCurrency}</Col>
                  <Col>{offer.amountInSrc} {offer.sourceCurrency}</Col>
                  <Col>{offer.sourceCountry}</Col>
                  <Col>{offer.expirationDate}</Col>
                  <Col><Button onClick={() => this.autoMatch(offer.id)}>Auto Match</Button></Col>
                </Row>
              </ListGroup.Item>
            </Accordion.Toggle>
          ))}
        </div>
      </div>
    );
  }
}

export default MyOffer;
