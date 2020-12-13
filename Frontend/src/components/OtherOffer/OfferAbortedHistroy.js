import React, { Component } from "react";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import { address } from "../../js/helper/constant";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import OfferHeader from "./OfferHeader";
import Badge from 'react-bootstrap/Badge';
// import Modal from "./Modal";
import Modal1 from "react-bootstrap/Modal";
import { Spinner } from "react-bootstrap";
class OfferAbortedHistory extends Component {
  state = {
    navarr: ["black", "rgb(0, 106, 255)"],
    singleOfferList: [],
    splitOfferList: [],
    open: false,
    spinner: false,
  };
  componentWillMount() {
    this.getOfferHistory();
  }

  async getOfferHistory() {
    let transactionlist;
    try {
      transactionlist = await axios.get(
        `${address}/offer/abort/history/${localStorage.getItem("visitId")}`
      );
      let splitOfferList = [];
      let singleOfferList = [];
      for (let i = 0; i < transactionlist.data.length; i++) {
        let splitOffer = {};
        let singleOffer = {};
        // console.log(transactionlist.data[i]);
        if (transactionlist.data[i].offerId3 !== null) {
          splitOffer = await axios.get(`${address}/transaction/offer/${transactionlist.data[i].offerId1}
          /${transactionlist.data[i].offerId2}/${transactionlist.data[i].offerId3}`);
          //   splitOffer.data = {
          //     ...splitOffer.data,
          //     id: transactionlist.data[i].id,
          //   };
          splitOffer.data[3] = transactionlist.data[i].id;
          //   console.log(splitOffer.data);
          splitOfferList.push(splitOffer.data);
        } else {
          singleOffer = await axios.get(`${address}/transaction/offer/${transactionlist.data[i].offerId1}
        /${transactionlist.data[i].offerId2}`);
          singleOffer.data[2] = transactionlist.data[i].id;
          //   console.log(singleOffer.data);
          singleOfferList.push(singleOffer.data);
        }
      }
      Promise.all(splitOfferList).then(() => {
        //console.log(splitOfferList);
        this.setState({ splitOfferList });
      });
      Promise.all(singleOfferList).then(() => {
        //console.log(singleOfferList);
        this.setState({ singleOfferList });
      });
    } catch (error) {
      toast.error("Internal Error Occurred");
    }
  }
  handleClickOpen = (offer) => {
    this.setState({ offerToBeConfirmed: offer });
    //console.log(offer);
    this.setState({ value: offer.amountInSrc });
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  confirmAction = async (e) => {
    e.preventDefault();
    this.handleClose();
    this.setState({ spinner: true });
    console.log("in confirming", this.state.offerToBeConfirmed);
    await axios.put(
      `${address}/transaction/offer/receivemoney/${this.state.offerToBeConfirmed.transactionid}/${this.state.offerToBeConfirmed.id}`,
      {}
    );
    this.setState({ spinner: false });
    toast.success("Your payment has been transfered");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    this.getInTransactionOrders();
  };
  render() {
    let { singleOfferList, splitOfferList } = this.state;
    let id = parseInt(localStorage.getItem("visitId"));
    let mySingleOffer,
      otherSingleOffers,
      mySplitOffer,
      otherSplitOffers,
      singleOfferUpdated = [],
      splitOfferUpdated = [];
    singleOfferList.map((offerarr) => {
      // console.log(localStorage.getItem("id"));
      mySingleOffer = offerarr.filter((offer) => offer.userId === id);
      mySingleOffer[0] = {
        ...mySingleOffer[0],
        transactionid: offerarr[2],
      };
      //   console.log(mySingleOffer);
      otherSingleOffers = offerarr.filter((offer) => offer.userId !== id);
      otherSingleOffers.pop();
      singleOfferUpdated.push({ mySingleOffer, otherSingleOffers });
    });
    splitOfferList.map((offerarr) => {
      mySplitOffer = offerarr.filter((offer) => offer.userId === id);
      mySplitOffer[0] = {
        ...mySplitOffer[0],
        transactionid: offerarr[3],
      };
      //   console.log(mySplitOffer);
      otherSplitOffers = offerarr.filter((offer) => offer.userId !== id);
      otherSplitOffers.pop();
      splitOfferUpdated.push({ mySplitOffer, otherSplitOffers });
    });
    console.log(splitOfferUpdated);
    console.log(singleOfferUpdated);
    return (
      <div>
        <Navbar></Navbar>
        <OfferHeader navarr={this.state.navarr}></OfferHeader>
        <Row align="center">
          <Col>
            <h3>Single Matches</h3>
          </Col>
        </Row>
       
          <Accordion.Toggle as={Card.Header} eventKey="0" className="background-history">
            {singleOfferUpdated.map((offerarr) => (
              <div>
                 <Card style={{marginBottom:'2%'}}>
                <ListGroup.Item
                  variant="secondary"
                  className="list-group-style-auto-matching "
                >
                  <div className="p-3" style={{ border: "3px red solid" }}>
                    <Row className="header-bold-auto-matching ">
                      <Col>Offer ID</Col>
                      <Col>Username</Col>
                      <Col>Country(des)</Col>
                      <Col>Amount(des)</Col>
                      <Col>Amount(src)</Col>
                      <Col>Country(src)</Col>
                      <Col>Exp Date</Col>
                      <Col>Status</Col>
                    </Row>
                    <Row>
                      <Col>#{offerarr.mySingleOffer[0].id}</Col>
                      <Col>{offerarr.mySingleOffer[0].nickname}</Col>
                      <Col>{offerarr.mySingleOffer[0].destinationCountry}</Col>
                      <Col>
                        {offerarr.mySingleOffer[0].amountInDes}{" "}
                        {offerarr.mySingleOffer[0].destinationCurrency}
                      </Col>
                      <Col>
                        {offerarr.mySingleOffer[0].amountInSrc}{" "}
                        {offerarr.mySingleOffer[0].sourceCurrency}
                      </Col>
                      <Col>{offerarr.mySingleOffer[0].sourceCountry}</Col>
                      <Col>{offerarr.mySingleOffer[0].expirationDate}</Col>
                      <Col><h5><Badge variant="danger">Aborted</Badge></h5></Col>
                    </Row>
                  </div>
                </ListGroup.Item>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item variant="" className="">
                      <Row className="header-bold-auto-matching ">
                        <Col>Offer ID</Col>
                        <Col>Username</Col>
                        <Col>Country(des)</Col>
                        <Col>Amount(des)</Col>
                        <Col>Amount(src)</Col>
                        <Col>Country(src)</Col>
                        <Col>Exp Date</Col>
                        <Col>Status</Col>
                      </Row>
                      <Row>
                        <Col>#{offerarr.otherSingleOffers[0].id}</Col>
                        <Col>
                          {offerarr.otherSingleOffers[0].nickname.slice(0, 2)}
                          <span style={{ fontSize: "22px" }}>***</span>
                        </Col>
                        <Col>
                          {offerarr.otherSingleOffers[0].destinationCountry}
                        </Col>
                        <Col>
                          {offerarr.otherSingleOffers[0].amountInDes}{" "}
                          {offerarr.otherSingleOffers[0].destinationCurrency}
                        </Col>
                        <Col>
                          {offerarr.otherSingleOffers[0].amountInSrc}{" "}
                          {offerarr.otherSingleOffers[0].sourceCurrency}
                        </Col>
                        <Col>{offerarr.otherSingleOffers[0].sourceCountry}</Col>
                        <Col>
                          {offerarr.otherSingleOffers[0].expirationDate}
                        </Col>
                        <Col><h5><Badge variant="danger">Aborted</Badge></h5></Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                </Card>
              </div>
            ))}
          </Accordion.Toggle>

  
        <Row align="center" className="my-4">
          <Col>
            <h3>Split Matches</h3>
          </Col>
        </Row>
        
          <Accordion.Toggle as={Card.Header} eventKey="0" className="background-history">
            {splitOfferUpdated.map((offerarr) => (
              <div>
                <Card style={{marginBottom:'2%'}}>
                <ListGroup.Item
                  variant="secondary"
                  className="list-group-style-auto-matching "
                >
                  <div className="p-3" style={{ border: "3px red solid" }}>
                    <Row className="header-bold-auto-matching ">
                      <Col>Offer ID</Col>
                      <Col>Username</Col>
                      <Col>Country(des)</Col>
                      <Col>Amount(des)</Col>
                      <Col>Amount(src)</Col>
                      <Col>Country(src)</Col>
                      <Col>Exp Date</Col>
                      <Col>Status</Col>
                    </Row>
                    <Row>
                      <Col>#{offerarr.mySplitOffer[0].id}</Col>
                      <Col>{offerarr.mySplitOffer[0].nickname}</Col>
                      <Col>{offerarr.mySplitOffer[0].destinationCountry}</Col>
                      <Col>
                        {offerarr.mySplitOffer[0].amountInDes}{" "}
                        {offerarr.mySplitOffer[0].destinationCurrency}
                      </Col>
                      <Col>
                        {offerarr.mySplitOffer[0].amountInSrc}{" "}
                        {offerarr.mySplitOffer[0].sourceCurrency}
                      </Col>
                      <Col>{offerarr.mySplitOffer[0].sourceCountry}</Col>
                      <Col>{offerarr.mySplitOffer[0].expirationDate}</Col>
                      <Col><h5><Badge variant="danger">Aborted</Badge></h5></Col>
                    </Row>
                  </div>
                </ListGroup.Item>
                {offerarr.otherSplitOffers.map((offer) => (
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item variant="" className="">
                        <Row className="header-bold-auto-matching ">
                          <Col>Offer ID</Col>
                          <Col>Username</Col>
                          <Col>Country(des)</Col>
                          <Col>Amount(des)</Col>
                          <Col>Amount(src)</Col>
                          <Col>Country(src)</Col>
                          <Col>Exp Date</Col>
                          <Col>Status</Col>
                        </Row>
                        <Row>
                          <Col>#{offer.id}</Col>
                          <Col>
                            {offer.nickname.slice(0, 2)}
                            <span style={{ fontSize: "22px" }}>***</span>
                          </Col>
                          <Col>{offer.destinationCountry}</Col>
                          <Col>
                            {offer.amountInDes} {offer.destinationCurrency}
                          </Col>
                          <Col>
                            {offer.amountInSrc} {offer.sourceCurrency}
                          </Col>
                          <Col>{offer.sourceCountry}</Col>
                          <Col>{offer.expirationDate}</Col>
                          <Col><h5><Badge variant="danger">Aborted</Badge></h5></Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                ))}
                </Card>
              </div>
            ))}
          </Accordion.Toggle>
      </div>
    );
  }
}

export default OfferAbortedHistory;
