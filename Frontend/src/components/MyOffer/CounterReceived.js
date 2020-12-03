import React, { Component } from "react";
import MyOfferHeader from "./MyOfferHeader";
import Navbar from "../Navbar/navbar";
import Axios from "axios";
import { address } from "../../js/helper/constant";
import { Button, Card, ListGroup } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';

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
      console.log(response.data)
    })
  }
  getStatus = (status) => {
    if (status == 0) {
      return "Open";
    } else if (status == 1) {
      return "Accepted";
    } else if (status == 2) {
      return "Rejected";
    } else {
      return "Aborted";
    }
  }
  acceptCounter = (e, counterObject) => {
    e.preventDefault();
    let data = { "id": counterObject.counterOfferId, "srcUserId": counterObject.srcOfferDTO.userId, "srcOfferId": counterObject.srcOfferDTO.id, "tgtUserId": counterObject.tgtOfferDTO.userId, "tgtOfferId": counterObject.tgtOfferDTO.id, "otherUserId": counterObject.otherOfferDTO && counterObject.otherOfferDTO.userId, "otherOfferId": counterObject.otherOfferDTO && counterObject.otherOfferDTO.id, "counterAmtFromSrcToTgt": counterObject.counterAmtFromSrcToTgt, "counterCurrencyFromSrcToTgt": counterObject.counterCurrencyFromSrcToTgt, "counterStatus": counterObject.counterStatus }
    console.log(data)
    Axios.put(address + '/counterOffer/accept', data).then((response) => {
      if (response.status == 200) {

        Axios.get(address + '/offerMatching/receivedCounterOffers/' + this.state.userId).then((response) => {
          this.setState({ offers: response.data });
          toast.success("You have successfully accepted the counter offer !")
          console.log(response.data)
        })
      }
    }).catch((err) => {
      toast.error("Internal Error Occurred")
    })
  }
  rejectCounter = (e, counterObject) => {
    e.preventDefault();
    let data = { "id": counterObject.counterOfferId, "srcUserId": counterObject.srcOfferDTO.userId, "srcOfferId": counterObject.srcOfferDTO.id, "tgtUserId": counterObject.tgtOfferDTO.userId, "tgtOfferId": counterObject.tgtOfferDTO.id, "otherUserId": counterObject.otherOfferDTO && counterObject.otherOfferDTO.userId, "otherOfferId": counterObject.otherOfferDTO && counterObject.otherOfferDTO.id, "counterAmtFromSrcToTgt": counterObject.counterAmtFromSrcToTgt, "counterCurrencyFromSrcToTgt": counterObject.counterCurrencyFromSrcToTgt, "counterStatus": counterObject.counterStatus }
    console.log(data)
    Axios.put(address + '/counterOffer/reject', data).then((response) => {
      if (response.status == 200) {
        Axios.get(address + '/offerMatching/receivedCounterOffers/' + this.state.userId).then((response) => {
          this.setState({ offers: response.data });
          toast.success("You have rejected the counter offer !");
        })
      }
    }).catch((err) => {
      toast.error("Internal Error Occurred")
    })
  }
  render() {
    let inner = []
    let warning = "warning";
    let primary = ""
    this.state.offers.forEach((element) => {
      inner.push(<Card className="margin-left-right-offer margin-bottom-offer-1">
        <ListGroup>
          <ListGroup.Item >
            <Row className="margin-bottom-offer">
              <Col md={4}><u><strong>Proposed Amount </strong></u> :{element.counterAmtFromSrcToTgt} {element.counterCurrencyFromSrcToTgt}</Col>
              {element.counterStatus == 0 && <Col md={2}><Button style={{ marginBottom: '1%' }} size="sm" variant="success" onClick={(e) => this.acceptCounter(e, element)}>Accept Offer</Button></Col>}
              {element.counterStatus == 0 && <Col md={2}><Button size="sm" variant="danger" onClick={(e) => this.rejectCounter(e, element)}>Reject  Offer</Button></Col>}
              {element.counterStatus != 0 && <Col><u><strong>Status </strong></u> :{this.getStatus(element.counterStatus)}</Col>}
            </Row>
          </ListGroup.Item>
          <ListGroup.Item variant="warning">
            <Row className="margin-bottom-offer"><u><strong>My existing offer(which was countered):</strong></u></Row>

            <Row className="header-bold-auto-matching ">
              <Col>Offer ID</Col>
              <Col>Username</Col>
              <Col>Country(des)</Col>
              <Col>Amount(des)</Col>
              <Col>Amount(src)</Col>
              <Col>Country(src)</Col>
              <Col>Exp Date</Col>
            </Row>
            <Row>
              <Col>#{element.tgtOfferDTO.id}</Col>
              <Col>{element.tgtOfferDTO.nickname}</Col>
              <Col>{element.tgtOfferDTO.destinationCountry}</Col>
              <Col>{element.tgtOfferDTO.amountInDes} {element.tgtOfferDTO.destinationCurrency}</Col>
              <Col>{element.tgtOfferDTO.amountInSrc} {element.tgtOfferDTO.sourceCurrency}</Col>
              <Col>{element.tgtOfferDTO.sourceCountry}</Col>
              <Col>{element.tgtOfferDTO.expirationDate}</Col>


            </Row>
          </ListGroup.Item>
          <ListGroup.Item >
            <Row className="margin-bottom-offer"><u><strong>Requested By:</strong></u></Row>

            <Row className="header-bold-auto-matching ">
              <Col>Offer ID</Col>
              <Col>Username</Col>
              <Col>Country(des)</Col>
              <Col>Amount(des)</Col>
              <Col>Amount(src)</Col>
              <Col>Country(src)</Col>
              <Col>Exp Date</Col>
            </Row>
            <Row>

              <Col>#{element.srcOfferDTO.id}</Col>
              <Col>{element.srcOfferDTO.nickname}</Col>
              <Col>{element.srcOfferDTO.destinationCountry}</Col>
              <Col>{element.srcOfferDTO.amountInDes} {element.srcOfferDTO.destinationCurrency}</Col>
              <Col>{element.srcOfferDTO.amountInSrc} {element.srcOfferDTO.sourceCurrency}</Col>
              <Col>{element.srcOfferDTO.sourceCountry}</Col>
              <Col>{element.srcOfferDTO.expirationDate}</Col>
            </Row>
          </ListGroup.Item>

          {element.otherOfferDTO && <ListGroup.Item>
            <Row className="margin-bottom-offer"><u><strong>Third Party:</strong></u></Row>
            <Row className="header-bold-auto-matching ">
              <Col>Offer ID</Col>
              <Col>Username</Col>
              <Col>Country(des)</Col>
              <Col>Amount(des)</Col>
              <Col>Amount(src)</Col>
              <Col>Country(src)</Col>
              <Col>Exp Date</Col>
            </Row>
            <Row>
              <Col>#{element.otherOfferDTO.id}</Col>
              <Col>{element.otherOfferDTO.nickname}</Col>
              <Col>{element.otherOfferDTO.destinationCountry}</Col>
              <Col>{element.otherOfferDTO.amountInDes} {element.otherOfferDTO.destinationCurrency}</Col>
              <Col>{element.otherOfferDTO.amountInSrc} {element.otherOfferDTO.sourceCurrency}</Col>
              <Col>{element.otherOfferDTO.sourceCountry}</Col>
              <Col>{element.otherOfferDTO.expirationDate}</Col>
            </Row>
          </ListGroup.Item>}
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
