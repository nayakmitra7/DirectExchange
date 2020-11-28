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
      paginationOffers = paginationOffers.filter(
        (offer) =>
          offer.amountInDes === parseInt(this.state.destinationAmountFilter)
      );
    }
    if (this.state.sourceAmountFilter != "empty") {
      paginationOffers = paginationOffers.filter(
        (offer) => offer.amountInSrc === parseInt(this.state.sourceAmountFilter)
      );
    }

    this.setState({ count: paginationOffers.length }, () => {
      this.setState({ paginationOffers }, () => {
        this.getPage();
      });
    });
  };
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Container>
          <Card className="card mb-4">
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
                    onChange={(e) =>
                      this.setState({ sourceAmountFilter: e.target.value })
                    }
                  />
                </div>
                <div className="col-4 ">
                  <label style={{ fontWeight: "bold" }}>
                    Destination Country Amount
                  </label>
                  <input
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ destinationAmountFilter: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center p-3 mt-4">
                <button
                  className="btn btn-success"
                  style={{ fontSize: "18px" }}
                  onClick={this.applyFilter}
                >
                  Filter
                </button>
              </div>
            </Card.Body>
          </Card>

          {this.state.paginationOffers.length != 0
            ? this.state.paginationOffers.map((offer) => (
                <Card
                  className="card"
                  style={{ backgroundColor: "rgb(0,0,0,0.1)" }}
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
                        {offer.sourceCountry}
                      </span>
                      <span style={{ color: "rgb(0,0,0,0.6)" }}>
                        ({offer.sourceCurrency})
                      </span>
                    </h5>
                    <ArrowRightAltSharpIcon />{" "}
                    <h5 className="ml-4">
                      Destination Amount:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {offer.destinationCountry}
                      </span>
                      <span style={{ color: "rgb(0,0,0,0.6)" }}>
                        ({offer.destinationCurrency})
                      </span>
                    </h5>
                  </div>
                  <div className="p-3 d-flex justify-content-center">
                    <div>
                      <h5>
                        {" "}
                        Remit Amount: {offer.amountInSrc}{" "}
                        <span style={{ color: "rgb(0,0,0,0.6)" }}>
                          ({offer.sourceCurrency})
                        </span>
                      </h5>
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
                </Card>
              ))
            : ""}
          <div className="center-page p-3 mt-2">
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
        </Container>
      </div>
    );
  }
}

export default BrowseOffer;
