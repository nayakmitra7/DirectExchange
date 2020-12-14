import React, { Component } from "react";
import MyOfferHeader from "./MyOfferHeader";
import Navbar from "../Navbar/navbar";
import Axios from "axios";
import { address } from "../../js/helper/constant";
import { Card, ListGroup } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { Spinner } from 'react-bootstrap';
class CounterMade extends Component {
  constructor() {
    super();
    this.state = {
      navarr: ["black", "black", "black", "rgb(0, 106, 255)", "black"],
      userId: localStorage.getItem("id"),
      offers: [],
      spinner:true
    }
  }
  componentDidMount() {

    Axios.get(address + '/offerMatching/proposedCounterOffers/' + this.state.userId).then((response) => {
      this.setState({ offers: response.data, spinner:false });
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
    } else if (status == 3) {
      return "Aborted";
    }else{
      return "Timed out";
    }

  }
  
  render() {
    let inner = []
    let warning = "warning";
    let primary = ""
    this.state.offers.forEach((element) => {

      inner.push(<Card className="margin-left-right-offer margin-bottom-offer-1">
        <ListGroup>
          <ListGroup.Item>
            <Row className="margin-bottom-offer">
              <Col><u><strong>Proposed To </strong></u> :{element.tgtOfferDTO.nickname}</Col>
              <Col><u><strong>Proposed Amount </strong></u> :{element.counterAmtFromSrcToTgt} {element.counterCurrencyFromSrcToTgt}</Col>
              <Col><u><strong>Status </strong></u> :{this.getStatus(element.counterStatus)}</Col>

              </Row>
          </ListGroup.Item>
          <ListGroup.Item variant="warning">
            <Row className="margin-bottom-offer"><u><strong>Original Offer (which was countered):</strong></u></Row>
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
            <Row className="margin-bottom-offer"><u><strong>My Current offer:</strong></u></Row>
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
        {inner}
      </div>
    );
  }
}

export default CounterMade;
