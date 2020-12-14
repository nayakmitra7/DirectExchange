import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Card from "react-bootstrap/Card";
import "../BrowseOffer/browseoffer.css";
import { address } from "../../js/helper/constant";
import Select from "react-select";
import months from "../../js/helper/months.json";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
class Individualreport extends Component {
  state = {
    selectedMonth: months[0],
    offers: [],
    totalFee: 0,
    totalSourceCurrency: 0,
  };
  handleMonth = (selectedMonth) => {
    console.log(selectedMonth);
    this.setState({ selectedMonth: selectedMonth }, () => {
      this.getOffersByMonth();
    });
  };
  componentDidMount() {
    this.getOffersByMonth();
  }

  getOffersByMonth = async () => {
    const offers = await axios.get(
      `${address}/offer/user/month/${localStorage.getItem("id")}/${
        this.state.selectedMonth.value
      }`
    );
    this.setState({ offers: offers }, () => {
      this.getTotalServiceFee();
      this.getTotalSourceCurrency();
      this.getTotalDestinationCurrency();
    });
  };
  getTotalServiceFee = () => {
    let { offers } = this.state;
    let totalFee = 0;
    for (let i = 0; i < offers; i++) {
      totalFee += offers[i].amountInDes * 0.05;
    }
    this.setState({ totalFee });
  };
  getTotalSourceCurrency = () => {
    let { offers } = this.state;
    let totalSourceCurrency = 0;
    for (let i = 0; i < offers; i++) {
      totalSourceCurrency += offers[i].amountInSrc;
    }
    this.setState({ totalSourceCurrency });
  };

  getTotalDestinationCurrency = () => {
    let { offers } = this.state;
    let totalDestinationCurrency = 0;
    for (let i = 0; i < offers; i++) {
      totalDestinationCurrency += offers[i].amountInDes;
    }
    this.setState({ totalDestinationCurrency });
  };

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Card className="card mb-4 margin-top-browse-offer margin-left-right-browse-offer">
          <Card.Header className="card-header" style={{ textAlign: "center" }}>
            <h2>Monthwise Report</h2>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div className="col-4 d-flex justify-content-between">
                <label style={{ fontWeight: "bold" }}>
                  Total Source Currency transfered
                </label>
                <input
                  className="form-control mx-2 col-8"
                  style={{ fontSize: "18px" }}
                  type="text"
                  disabled="true"
                  value="$1000"
                ></input>
              </div>
              <div className="col-4 d-flex justify-content-between">
                <label style={{ fontWeight: "bold" }}>
                  Total Destination Currency Received
                </label>
                <input
                  className="form-control mx-2 col-8"
                  style={{ fontSize: "18px" }}
                  type="text"
                  disabled="true"
                  value="73500 inr"
                ></input>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div className="col-4 d-flex justify-content-between">
                <label style={{ fontWeight: "bold" }}>Service Fee Rate</label>
                <input
                  className="form-control mx-2 col-8"
                  style={{ fontSize: "18px" }}
                  type="text"
                  disabled="true"
                  value="0.05"
                ></input>
              </div>
              <div className="col-4 d-flex justify-content-between">
                <label style={{ fontWeight: "bold" }}>Total Service Fee</label>
                <input
                  className="form-control mx-2 col-8"
                  style={{ fontSize: "18px" }}
                  type="text"
                  disabled="true"
                  value="$10.05"
                ></input>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-4 p-3 mt-3 ">
                <Select
                  value={this.state.selectedMonth}
                  onChange={this.handleMonth}
                  options={months}
                ></Select>
              </div>
            </div>
          </Card.Body>
        </Card>
        <div>
          <Row>
            <Col>
              <Card className="margin-left-right-browse-offer">
                <Card.Body>
                  <Row
                    className="header-bold-auto-matching"
                    style={{ cursor: "pointer" }}
                  >
                    <Col>ID</Col>
                    <Col>Username</Col>
                    <Col>Country(src)</Col>
                    <Col>Amount(src)</Col>
                    <Col>Amount(des)</Col>
                    <Col>Country(des)</Col>
                    <Col>Date</Col>
                  </Row>
                  <Row>
                    {/* <Col>#{offer.id}</Col>
                    <Col>{offer.nickname}</Col>
                    <Col>{offer.sourceCountry}</Col>
                    <Col>
                      {offer.amountInSrc} {offer.sourceCurrency}
                    </Col>
                    <Col>
                      {offer.amountInDes} {offer.destinationCurrency}
                    </Col>
                    <Col>{offer.destinationCountry} </Col>
                    <Col>{offer.expirationDate}</Col> */}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Individualreport;
