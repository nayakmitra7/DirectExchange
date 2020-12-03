import React, { Component } from "react";
import MyOfferHeader from "./MyOfferHeader";
import Navbar from "../Navbar/navbar";
import Axios from "axios";
import { address } from "../../js/helper/constant";
import { Button, Card, ListGroup } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class CounterReceived extends Component {
  constructor() {
    super();
    this.state = {
      navarr: ["black", "black", "black", "black", "rgb(0, 106, 255)"],
      userId: localStorage.getItem("id"),
      offers: []
    }
  }
  componentDidMount() {

    Axios.get(address + '/offerMatching/receivedCounterOffers/' + this.state.userId).then((response) => {
      this.setState({ offers: response.data });
    })
  }
  render() {
    let inner = []
    let warning = "warning";
    let primary = ""
    this.state.offers.forEach((element) => {
      console.log(element.srcOfferDTO.id)
      inner.push(<Card className="margin-left-right-offer margin-bottom-offer-1">
        <ListGroup>
          <ListGroup.Item >
          <Row className="margin-bottom-offer"><u><strong>Requested Offer:</strong></u></Row>

            <Row className="header-bold-auto-matching ">
              <Col>Offer ID</Col>
              <Col>Username</Col>
              <Col>Country(des)</Col>
              <Col>Amount(des)</Col>
              <Col>Amount(src)</Col>
              <Col>Country(src)</Col>
              <Col>Exp Date</Col>
              <Col><Button style={{marginBottom:'1%'}} size="sm" variant="success">Accept Offer</Button></Col>
            </Row>
            <Row>

              <Col>#{element.srcOfferDTO.id}</Col>
              <Col>{element.srcOfferDTO.nickname}</Col>
              <Col>{element.srcOfferDTO.destinationCountry}</Col>
              <Col>{element.srcOfferDTO.amountInDes} {element.srcOfferDTO.destinationCurrency}</Col>
              <Col>{element.srcOfferDTO.amountInSrc} {element.srcOfferDTO.sourceCurrency}</Col>
              <Col>{element.srcOfferDTO.sourceCountry}</Col>
              <Col>{element.srcOfferDTO.expirationDate}</Col>
              <Col><Button size="sm" variant="danger">Reject  Offer</Button></Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
          <Row className="margin-bottom-offer"><u><strong>My existing offer:</strong></u></Row>

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
              <Col>#{element.tgtOfferDTO.id}</Col>
              <Col>{element.tgtOfferDTO.nickname}</Col>
              <Col>{element.tgtOfferDTO.destinationCountry}</Col>
              <Col>{element.tgtOfferDTO.amountInDes} {element.tgtOfferDTO.destinationCurrency}</Col>
              <Col>{element.tgtOfferDTO.amountInSrc} {element.tgtOfferDTO.sourceCurrency}</Col>
              <Col>{element.tgtOfferDTO.sourceCountry}</Col>
              <Col>{element.tgtOfferDTO.expirationDate}</Col>
              <Col></Col>
            </Row>
          </ListGroup.Item>

        </ListGroup>
      </Card>)
    })
    return (
      <div>
        <Navbar></Navbar>
        <MyOfferHeader navarr={this.state.navarr}></MyOfferHeader>
        {inner}
      </div>
    );
  }
}

export default CounterReceived;
