import React, { Component } from "react";
import MyOfferHeader from "./MyOfferHeader";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import { address } from "../../js/helper/constant";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
class InTransactionOffer extends Component {
  state = {
    navarr: ["black", "black", "rgb(0, 106, 255)", "black", "black"],
    singleOfferList: [],
    splitOfferList: [],
  };
  componentWillMount() {
    this.getInTransactionOrders();
  }

  async getInTransactionOrders() {
    let transactionlist;
    try {
      transactionlist = await axios.get(
        `${address}/intransaction/${localStorage.getItem("id")}`
      );
      let splitOfferList = [];
      let singleOfferList = [];
      for (let i = 0; i < transactionlist.data.length; i++) {
        let splitOffer = {};
        let singleOffer = {};
        if (transactionlist.data[i].offerId3 !== null) {
          splitOffer = await axios.get(`${address}/transaction/offer/${transactionlist.data[i].offerId1}
          /${transactionlist.data[i].offerId2}/${transactionlist.data[i].offerId3}`);
          splitOfferList.push(splitOffer.data);
        } else {
          singleOffer = await axios.get(`${address}/transaction/offer/${transactionlist.data[i].offerId1}
        /${transactionlist.data[i].offerId2}`);
          singleOfferList.push(singleOffer.data);
        }

        // await axios.get(
        //     `${address}/transaction/offer/${}`
        //   );
      }
      Promise.all(splitOfferList).then(() => {
        console.log(splitOfferList);
        this.setState({ splitOfferList });
      });
      Promise.all(singleOfferList).then(() => {
        console.log(singleOfferList);
        this.setState({ singleOfferList });
      });
    } catch (error) {
      toast.error("Internal Error Occurred");
    }
  }

  render() {
    let { singleOfferList, splitOfferList } = this.state;
    let id = parseInt(localStorage.getItem("id"));
    let mySingleOffer,
      otherSingleOffers,
      mySplitOffer,
      otherSplitOffers,
      singleOfferUpdated = [],
      splitOfferUpdated = [];
    singleOfferList.map((offerarr) => {
      console.log(localStorage.getItem("id"));
      mySingleOffer = offerarr.filter((offer) => offer.userId === id);
      otherSingleOffers = offerarr.filter((offer) => offer.userId !== id);
      singleOfferUpdated.push({ mySingleOffer, otherSingleOffers });
    });
    splitOfferList.map((offerarr) => {
      mySplitOffer = offerarr.filter((offer) => offer.userId === id);
      otherSplitOffers = offerarr.filter((offer) => offer.userId !== id);
      splitOfferUpdated.push({ mySplitOffer, otherSplitOffers });
    });
    console.log(splitOfferUpdated);
    console.log(singleOfferUpdated);
    return (
      <div>
        <Navbar></Navbar>
        <MyOfferHeader navarr={this.state.navarr}></MyOfferHeader>
        <Row align="center">
          <Col><h3>Single Matches</h3></Col>
        </Row>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            {singleOfferUpdated.map((offerarr) => (
              <div>
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
                  </Row>
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
                      </Row>
                      <Row>
                        <Col>#{offerarr.otherSingleOffers[0].id}</Col>
                        <Col>{offerarr.otherSingleOffers[0].nickname}</Col>
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
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </div>
            ))}
          </Accordion.Toggle>

          {/* <Accordion.Toggle eventKey="0">
            
          </Accordion.Toggle> */}
        </Card>
        <Row align="center">
          <Col><h3>Split Matches</h3></Col>
        </Row>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            {splitOfferUpdated.map((offerarr) => (
              <div>
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
                  </Row>
                </ListGroup.Item>
                {offerarr.otherSplitOffers.map((offer)=>(
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
                      </Row>
                      <Row>
                        <Col>#{offer.id}</Col>
                        <Col>{offer.nickname}</Col>
                        <Col>
                          {offer.destinationCountry}
                        </Col>
                        <Col>
                          {offer.amountInDes}{" "}
                          {offer.destinationCurrency}
                        </Col>
                        <Col>
                          {offer.amountInSrc}{" "}
                          {offer.sourceCurrency}
                        </Col>
                        <Col>{offer.sourceCountry}</Col>
                        <Col>
                          {offer.expirationDate}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body> 
                ))}
                
              </div>
            ))}
          </Accordion.Toggle>

          {/* <Accordion.Toggle eventKey="0">
            
          </Accordion.Toggle> */}
        </Card>
      </div>
    );
  }
}

export default InTransactionOffer;
