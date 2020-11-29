import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Card from "react-bootstrap/Card";
import "./browseoffer.css";
import { address } from "../../js/helper/constant";
import Select from "react-select";
import ArrowRightAltSharpIcon from "@material-ui/icons/ArrowRightAltSharp";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import OfferModal from "./OfferModal";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class BrowseOffer extends Component {
  state = {
    country: [],
    countryarr: [],
    offers: [],
    page: "1",
    limit: "5",
    count: "",
    page: 1,
    paginationOffers: [],
    selectedDesCurrencyOption: "empty",
    selectedSourceCurrencyOption: "empty",
    destinationAmountFilter: "empty",
    sourceAmountFilter: "empty",
    modalShow: "none",
    open: false,
  };
  componentWillMount() {
    this.getCountries();
    this.getOffers();
  }

  async getOffers() {
    const offers = await axios.get(`${address}/offer`);
    this.setState({ offers: offers.data });
    // });
    this.setState({ count: offers.data.length });
    console.log(
      (this.state.page - 1) * this.state.limit,
      parseInt(this.state.limit)
    );
    this.setState(
      {
        pagecount: Math.ceil(this.state.count / parseInt(this.state.limit)),
      },
      () => {
        console.log(this.state.pagecount);
        this.setState({
          paginationOffers: this.state.offers.slice(
            (this.state.page - 1) * this.state.limit,
            (this.state.page - 1) * this.state.limit + this.state.limit
          ),
        });
      }
    );
  }

  getPage() {
    this.setState(
      {
        pagecount: Math.ceil(this.state.count / parseInt(this.state.limit)),
      },
      () => {
        console.log(this.state.pagecount);
        this.setState({
          paginationOffers: this.state.paginationOffers.slice(
            (this.state.page - 1) * this.state.limit,
            (this.state.page - 1) * this.state.limit + this.state.limit
          ),
        });
      }
    );
  }

  async getCountries() {
    const country = await axios.get(`${address}/country`);
    let countryarr = [];
    country.data.map((c) => {
      countryarr.push({ value: c, label: c.currency });
    });
    this.setState({ countryarr });
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ page: pageNumber });
  }
  handleSourceCountryChange = (selectedSourceCurrencyOption) => {
    this.setState({ selectedSourceCurrencyOption });
    console.log(selectedSourceCurrencyOption.label);
  };
  handleDestinationCountryChange = (selectedDesCurrencyOption) => {
    this.setState({ selectedDesCurrencyOption });
    console.log(selectedDesCurrencyOption.label);
  };
  handlePageChange = (event, value) => {
    this.setState({ page: value });
    this.getOffers();
  };
  applyFilter = () => {
    let paginationOffers = this.state.offers;

    if (this.state.selectedSourceCurrencyOption != "empty") {
      paginationOffers = paginationOffers.filter(
        (offer) =>
          offer.sourceCurrency === this.state.selectedSourceCurrencyOption.label
      );
    }
    if (this.state.selectedDesCurrencyOption != "empty") {
      paginationOffers = paginationOffers.filter(
        (offer) =>
          offer.destinationCurrency ===
          this.state.selectedDesCurrencyOption.label
      );
    }
    if (this.state.destinationAmountFilter != "empty") {
      console.log(paginationOffers);
      paginationOffers = paginationOffers.filter(
        (offer) =>
          parseInt(offer.amountInDes) ===
          parseInt(this.state.destinationAmountFilter)
      );
    }
    if (this.state.sourceAmountFilter != "empty") {
      paginationOffers = paginationOffers.filter(
        (offer) =>
          parseInt(offer.amountInSrc) ===
          parseInt(this.state.sourceAmountFilter)
      );
    }

    this.setState({ count: paginationOffers.length }, () => {
      this.setState({ paginationOffers }, () => {
        this.getPage();
      });
    });
  };
  clearFilter = () => {
    this.setState({ destinationAmountFilter: "empty" });
    document.getElementById("sourceamount").value = "";
    document.getElementById("desamount").value = "";

    this.setState({ sourceAmountFilter: "empty" });
    this.getOffers();
  };
  changeModalVisible = () => {
    this.setState({ modalShow: "none", open: false }, () => {
      console.log(this.state.modalShow);
    });
  };

  render() {
    return (
      <div>
        <Navbar></Navbar>
          <Card className="card mb-4 margin-top-browse-offer margin-left-right-browse-offer">
            <Card.Header
              className="card-header"
              style={{ textAlign: "center" }}
            >
              <h2>Filter and Browse Offers</h2>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div className="col-4 ">
                  <label style={{ fontWeight: "bold" }}>Source Currency</label>
                  <Select
                    value={
                      this.state.selectedSourceCurrencyOption
                        ? this.state.selectedSourceCurrencyOption
                        : ""
                    }
                    onChange={this.handleSourceCountryChange}
                    options={this.state.countryarr}
                  />
                </div>
                <div className="col-4 ">
                  <label style={{ fontWeight: "bold" }}>
                    Destination Currency
                  </label>
                  <Select
                    value={
                      this.state.selectedDesCurrencyOption
                        ? this.state.selectedDesCurrencyOption
                        : ""
                    }
                    onChange={this.handleDestinationCountryChange}
                    options={this.state.countryarr}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="col-4 ">
                  <label style={{ fontWeight: "bold" }}>
                    Source Country Amount
                  </label>
                  <input
                    className="form-control"
                    id="sourceamount"
                    onChange={(e) =>
                      e.target.value !== ""
                        ? this.setState({ sourceAmountFilter: e.target.value })
                        : this.setState({ sourceAmountFilter: "empty" })
                    }
                  />
                </div>
                <div className="col-4 ">
                  <label style={{ fontWeight: "bold" }}>
                    Destination Country Amount
                  </label>
                  <input
                    className="form-control"
                    id="desamount"
                    onChange={(e) =>
                      e.target.value !== ""
                        ? this.setState({
                            destinationAmountFilter: e.target.value,
                          })
                        : this.setState({ destinationAmountFilter: "empty" })
                    }
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center p-3 mt-4">
                <button
                  className="btn btn-success mr-3 px-3"
                  style={{ fontSize: "18px" }}
                  onClick={this.applyFilter}
                >
                  Filter
                </button>
                <button
                  className="btn btn-secondary ml-3"
                  style={{ fontSize: "18px" }}
                  onClick={this.clearFilter}
                >
                  Clear Filters
                </button>
              </div>
            </Card.Body>
          </Card>
          {/* 
Cards to display offers
*/}

          {this.state.paginationOffers.length != 0
            ? this.state.paginationOffers.map((offer) => (
                <div>
                  <Row >
                    <Col>
                    <Card className="margin-left-right-browse-offer" onClick={() => {
                      this.setState({ modalShow: "block", open: true });
                      this.setState({ offerId: offer.id });
                    }}>
                      <Card.Body>
                      <Row className="header-bold-auto-matching  " >
                            <Col >ID</Col>
                            <Col >Username</Col>
                            <Col >Country(src)</Col>
                            <Col >Currency(src)</Col>
                      
                            <Col >Amount(src)</Col>
                            <Col >Amount(des)</Col>
                            <Col >Country(des)</Col>
                            <Col >Currency(des)</Col>
                            
                            <Col >ExpDate</Col>
                        </Row>
                        <Row>
                            <Col >#{offer.id}</Col>
                            <Col >Username</Col>
                            <Col >{offer.sourceCountry}</Col>
                            <Col >{offer.sourceCurrency}</Col>
                            <Col >{offer.amountInSrc}</Col>
                            <Col >{offer.amountInDes}</Col>
                            <Col >{offer.destinationCountry}</Col>
                            <Col >{offer.destinationCurrency}</Col>
                        
                            <Col >{offer.expirationDate}</Col>
                        </Row>
                      </Card.Body>
                    </Card>
                    </Col>
                  </Row>
                  {/*<Card
                    className="card browse_card"
                    style={{ backgroundColor: "rgb(0,0,0,0.1)" }}
                    onClick={() => {
                      this.setState({ modalShow: "block", open: true });
                      this.setState({ offerId: offer.id });
                    }}
                    key={offer.id}
                  >
                    <div className="d-flex justify-content-center p-2">
                      <h4>John Doe</h4>
                    </div>
                    <div className="d-flex justify-content-center p-3">
                      <h5 className="mr-4">
                        Source country:{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {offer.sourceCountry}
                        </span>
                        <span style={{ color: "rgb(0,0,0,0.6)" }}>
                          ({offer.sourceCurrency})
                        </span>
                      </h5>
                      <ArrowRightAltSharpIcon />{" "}
                      <h5 className="ml-4">
                        Destination country:{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {offer.destinationCountry}
                        </span>
                        <span style={{ color: "rgb(0,0,0,0.6)" }}>
                          ({offer.destinationCurrency})
                        </span>
                      </h5>
                    </div>
                    <div className="d-flex justify-content-center p-3">
                      <h5 className="mr-4">
                        Remit Amount:{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {offer.amountInSrc}
                        </span>
                        <span style={{ color: "rgb(0,0,0,0.6)" }}>
                          ({offer.sourceCurrency})
                        </span>
                      </h5>
                      <ArrowRightAltSharpIcon />{" "}
                      <h5 className="ml-4">
                        Destination Amount:{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {offer.amountInDes}
                        </span>
                        <span style={{ color: "rgb(0,0,0,0.6)" }}>
                          ({offer.destinationCurrency})
                        </span>
                      </h5>
                    </div>
                    <div className="p-3 d-flex justify-content-center">
                      <div>
                        {offer.splitOfferAllowed == true ? (
                          <h5>
                            Split offer{" "}
                            <span style={{ color: "green" }}>allowed</span>
                          </h5>
                        ) : (
                          ""
                        )}
                        {offer.counterOfferAllowed == true ? (
                          <h5>
                            <span style={{ color: "green" }}>Accepting </span>
                            Counter Offers
                          </h5>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                        </Card>*/}
                  {this.state.offerId === offer.id}
                  <OfferModal
                    offer={offer}
                    modalShow={this.state.modalShow}
                    changeModalVisible={this.changeModalVisible}
                    open={this.state.open}
                  ></OfferModal>
                </div>
              ))
            : ""}

          <div className="center-page p-3 mt-2 margin-left-right-browse-offer">
            <Typography>Page: {this.state.page}</Typography>
            <div className="d-flex justify-content-center mt-2">
              <Pagination
                count={this.state.pagecount}
                page={this.state.page}
                onChange={this.handlePageChange}
                variant="outlined"
                color="primary"
              />
            </div>
          </div>
      </div>
    );
  }
}

export default BrowseOffer;
