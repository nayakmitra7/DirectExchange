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
  };
  componentWillMount() {
    this.getCountries();
    this.getOffers();
  }

  async getOffers() {
    const offers = await axios.get(`${address}/offer`);
    this.setState({ offers: offers.data, count: offers.data.length }, () => {
      this.setState({
        pagecount: Math.ceil(this.state.count / this.state.limit),
      });
    });
  }

  async getCountries() {
    const country = await axios.get(`${address}/country`);
    let countryarr = [];
    country.data.map((c) => {
      countryarr.push({ value: c, label: c.country });
    });
    this.setState({ countryarr });
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ page: pageNumber });
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });

    console.log(`Option selected:`, selectedOption);
  };
  handlePageChange = (event, value) => {
    this.setState({ page: value });
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
                  <label style={{ fontWeight: "bold" }}>Source Country</label>
                  <Select
                    value={
                      this.state.selectedOption ? this.state.selectedOption : ""
                    }
                    onChange={this.handleChange}
                    options={this.state.countryarr}
                  />
                </div>
                <div className="col-4 ">
                  <label style={{ fontWeight: "bold" }}>
                    Destination Country
                  </label>
                  <Select
                    value={
                      this.state.selectedOption ? this.state.selectedOption : ""
                    }
                    onChange={this.handleChange}
                    options={this.state.countryarr}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="col-4 ">
                  <label style={{ fontWeight: "bold" }}>
                    Source Country Amount
                  </label>
                  <input className="form-control"></input>
                </div>
                <div className="col-4 ">
                  <label style={{ fontWeight: "bold" }}>
                    Destination Country Amount
                  </label>
                  <input className="form-control"></input>
                </div>
              </div>
              <div className="d-flex justify-content-center p-3 mt-4">
                <button
                  className="btn btn-success"
                  style={{ fontSize: "18px" }}
                >
                  Filter
                </button>
              </div>
            </Card.Body>
          </Card>

          {this.state.offers.length != 0
            ? this.state.offers.map((offer) => (
                <Card className="card">
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
                  <div className="p-3 d-flex justify-content-center">
                    <div>
                      <h5>
                        {" "}
                        Remit Amount: {offer.amount}{" "}
                        <span style={{ color: "rgb(0,0,0,0.6)" }}>(USD)</span>
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
