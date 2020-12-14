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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactStars from 'react-stars';

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
    limit: 10,
    count: "",
    page: 1,
    paginationOffers: [],
    selectedDesCurrencyOption: "empty",
    selectedSourceCurrencyOption: "empty",
    destinationAmountFilter: "empty",
    sourceAmountFilter: "empty",
    modalShow: "none",
    open: false,
    ratingList:[{user_id: 1 , fault_count: 0, total_count:0},{user_id: 2 , fault_count: 10, total_count:10},{user_id: 10 , fault_count: 2, total_count:8},{user_id: 4 , fault_count: 7, total_count:17},{user_id: 5 , fault_count: 1, total_count:50},{user_id: 6 , fault_count: 6, total_count:16},{user_id: 9 , fault_count: 0, total_count:0},{user_id: 8 , fault_count: 0, total_count:0},{user_id: 12 , fault_count: 0, total_count:0}],
    ratingCalculations:{}
  };
  componentWillMount() {
   
    axios.get(address+'/rating').then((response)=>{
      response.data.forEach((user) =>{
        if(user.totalCount == 0){
          this.state.ratingCalculations[user.userId] ='N/A';
        }else{
          var divVal = user.faultCount/user.totalCount;
          var ratingVal = Math.round(((1-divVal)*4))+1
          this.state.ratingCalculations[user.userId] = ratingVal;
        }
         
      })
      this.getCountries();
      this.getOffers();
    })
     
  }

  async getOffers() {
    const offers = await axios.get(
      `${address}/offer/` + localStorage.getItem("id")
    );
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
        console.log(
          (this.state.page - 1) * this.state.limit,
          parseInt((this.state.page - 1) * this.state.limit) +
            parseInt(this.state.limit)
        );
        this.setState({
          paginationOffers: this.state.offers.slice(
            parseInt((this.state.page - 1) * this.state.limit),
            parseInt((this.state.page - 1) * this.state.limit) +
              parseInt(this.state.limit)
          ),
        });
      }
    );
    this.applyFilter();
  }

  getPage() {
    this.setState(
      {
        pagecount: Math.ceil(this.state.count / parseInt(this.state.limit)),
      },
      () => {
        console.log(this.state.pagecount);
        console.log(
          (this.state.page - 1) * this.state.limit,
          (this.state.page - 1) * this.state.limit + this.state.limit
        );
        // this.setState({
        //   paginationOffers: this.state.offers.slice(
        //     parseInt((this.state.page - 1) * this.state.limit),
        //     parseInt((this.state.page - 1) * this.state.limit) +
        //       parseInt(this.state.limit)
        //   ),
        // });
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
  // handlePageChange(pageNumber) {
  //   console.log(`active page is ${pageNumber}`);
  //   this.setState({ page: pageNumber });
  // }
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
    let {
      selectedSourceCurrencyOption,
      selectedDesCurrencyOption,
      destinationAmountFilter,
      sourceAmountFilter,
    } = this.state;

    if (
      sourceAmountFilter === "empty" &&
      destinationAmountFilter === "empty" &&
      selectedDesCurrencyOption === "empty" &&
      selectedSourceCurrencyOption === "empty"
    ) {
      return;
    }
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
    console.log(paginationOffers);
    this.setState({ count: paginationOffers.length }, () => {
      this.setState({ paginationOffers }, () => {
        this.getPage();
        console.log("kidan", this.state.paginationOffers);
        this.setState({
          paginationOffers: this.state.paginationOffers.slice(
            parseInt((this.state.page - 1) * this.state.limit),
            parseInt((this.state.page - 1) * this.state.limit) +
              parseInt(this.state.limit)
          ),
        });
      });
    });
  };
  clearFilter = () => {
    this.setState({ destinationAmountFilter: "empty" });
    document.getElementById("sourceamount").value = "";
    document.getElementById("desamount").value = "";
    this.setState({ selectedSourceCurrencyOption: "empty" });
    this.setState({ selectedDesCurrencyOption: "empty" });

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
          <Card.Header className="card-header" style={{ textAlign: "center" }}>
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
                <Row>
                  <Col>
                    <Card
                      className="margin-left-right-browse-offer"
                      onClick={() => {
                        this.setState({ modalShow: "block", open: true });
                        this.setState({ offerId: offer.id });
                      }}
                    >
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
                          <Col>ExpDate</Col>
                          <Col>Reputation</Col>
                        </Row>
                        <Row>
                          <Col>#{offer.id}</Col>
                          <Col>{offer.nickname}</Col>
                          <Col>{offer.sourceCountry}</Col>
                          <Col>{offer.amountInSrc} {offer.sourceCurrency}</Col>
                          <Col>{offer.amountInDes} {offer.destinationCurrency}</Col>
                          <Col>{offer.destinationCountry} </Col>
                          <Col>{offer.expirationDate}</Col>
                          
                          {this.state.ratingCalculations  && this.state.ratingCalculations[offer.userId] != 'N/A' && <Col><ReactStars count={5} size={24} color2={'#ffd700'} value={parseInt(this.state.ratingCalculations[offer.userId])} edit={false}/></Col>}

                          {this.state.ratingCalculations && this.state.ratingCalculations[offer.userId] == 'N/A' && <Col>N/A</Col>}
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
        
                {this.state.offerId === offer.id ? (
                  <OfferModal
                    offer={offer}
                    modalShow={this.state.modalShow}
                    changeModalVisible={this.changeModalVisible}
                    open={this.state.open}
                    ratingCalculations = {this.state.ratingCalculations}
                  ></OfferModal>
                ) : (
                  ""
                )}
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
