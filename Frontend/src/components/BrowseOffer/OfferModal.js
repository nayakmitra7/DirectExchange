import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { toast } from "react-toastify";
import { address, COUNTEROFFER_OPEN } from "../../js/helper/constant";
import Select from "react-select";
import CounterOffer from "../AutoMatching/CounterOffer";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

import ReactStars from 'react-stars';
class OfferModal extends Component {
  state = {
    modalShow: "none",
    myOffer: {},
    selectedCounterOffer: {},
    counterModal: false,
    url: "",
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(selectedOption);
  };

  // changeRating(newRating, name) {
  //   this.setState({
  //     rating: newRating,
  //   });
  // }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    const offeroptions = [];
    axios
      .get(`${address}/offer/` + localStorage.getItem("id") + `/open`)
      .then((response) => {
        // console.log(response.data);
        this.setState({ openOffers: response.data }, () => {
          //console.log(this.state.openOffers)
          this.state.openOffers.map((offer) =>
            offeroptions.push({
              label:
                offer.id +
                " - Offer Amount(Des): " +
                offer.amountInDes +
                " " +
                offer.destinationCurrency,
              value: offer,
            })
          );
        });
        this.setState({ offeroptions });
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: false,
        });
      });
    // console.log(offeroptions)
    this.setState({ url: `/offer/history/${this.props.offer.userId}` });
  }
  accept = (offer2) => {
    if (
      Math.round(offer2.amountInDes) ==
      Math.round(this.props.offer.amountInSrc) &&
      offer2.destinationCurrency == this.props.offer.sourceCurrency
    ) {
      this.setState({ spinner: true });
      let data = {
        isSplit: false,
        offerId1: this.props.offer.id,
        offerId2: offer2.id,
        offerUserId1: this.props.offer.userId,
        offerUserId2: offer2.userId,
      };
      axios
        .post(address + "/twoPartyTransaction", data)
        .then((response) => {
          if (response.status == 200) {
            this.setState({ spinner: false });
            toast.success("Your offer has now entered in transaction mode");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        })
        .catch((error) => {
          toast.error("Internal Error Occured");
        });
    } else {
      toast.error("The source and destination amounts are unequal");
    }
  };
  //Kena
  counterModalOpen = (selectedCounterOffer) => {
    this.setState({ counterModal: true, selectedCounterOffer });
  };
  counterModalClose = () => {
    this.setState({ counterModal: false });
  };
  submitCounterHandle = async (e, counterAmtFromSrcToTgt) => {
    e.preventDefault();
    console.log("In submitCounterOffer");
    let minBound = this.state.selectedCounterOffer.amountInSrc * 0.9;
    let maxBound = this.state.selectedCounterOffer.amountInSrc * 1.1;
    let withinRange =
      minBound <= counterAmtFromSrcToTgt && counterAmtFromSrcToTgt <= maxBound;
    if (withinRange) {
      axios
        .post(address + "/offerMatching/counterOffer", {
          srcOfferDTO: this.state.myOffer,
          tgtOfferDTO: this.state.selectedCounterOffer,
          counterAmtFromSrcToTgt,
          counterCurrencyFromSrcToTgt: this.state.selectedCounterOffer
            .sourceCurrency,
          counterStatus: COUNTEROFFER_OPEN,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success(
              "Counter offer email has been sent to " +
              this.state.selectedCounterOffer.nickname
            );
          }
        })
        .catch((err) => {
          toast.error("Error in making the counter offer");
        });
    } else {
      toast.error("Amount entered must be within the mentioned range");
    }
  };

  render() {
    localStorage.setItem("visitId", this.props.offer.userId);

    return (
      <div>
        <div
          id="myModal"
          className="modal"
          style={{ display: this.props.modalShow }}
        >
          <div
            className="modal-content col-10"
            style={{ fontFamily: "Suisse" }}
          >
            <div className="container">
              <span
                class="close"
                onClick={(e) => {
                  this.props.changeModalVisible();
                }}
              >
                &times;
              </span>
              <div align="center" className="p-3">
                <h1>{this.props.offer.nickname}'s Offer Details</h1>
              </div>
              <div>

              </div>
              {/* <Table striped borderless hover variant="dark">
                <tr className="p-3">
                  <td className="td_element">Source Country</td>
                  <td className="td_value">{this.props.offer.sourceCountry}</td>
                  <td className="td_element">Destination Country</td>
                  <td className="td_value">
                    {this.props.offer.destinationCountry}
                  </td>
                </tr>
                <tr className="p-3">
                  <td className="td_element">Source Amount</td>
                  <td className="td_value">
                    {this.props.offer.amountInSrc}(
                    {this.props.offer.sourceCurrency})
                  </td>
                  <td className="td_element">Destination Amount</td>
                  <td className="td_value">
                    {this.props.offer.amountInDes}(
                    {this.props.offer.destinationCurrency})
                  </td>
                </tr>
                <tr className="p-3">
                  <td className="td_element">Expiration Date</td>
                  <td className="td_value">
                    {this.props.offer.expirationDate}
                  </td>
                </tr>
              </Table> */}

              <ListGroup.Item
                variant="dark"
                className="list-group-style-offermodal"
              >
                <Row className="header-bold-auto-matching ">
                  <Col>Offer ID</Col>
                  <Col>Username</Col>
                  <Col>Country(des)</Col>
                  <Col>Amount(des)</Col>
                  <Col>Amount(src)</Col>
                  <Col>Country(src)</Col>
                  <Col>Exp Date</Col>
                  <Col>Reputation</Col>
                </Row>
                <Row>
                  <Col>#{this.props.offer.id}</Col>
                  <Col>{this.props.offer.nickname}</Col>
                  <Col>{this.props.offer.destinationCountry}</Col>
                  <Col>
                    {this.props.offer.amountInDes}{" "}
                    {this.props.offer.destinationCurrency}
                  </Col>
                  <Col>
                    {this.props.offer.amountInSrc}{" "}
                    {this.props.offer.sourceCurrency}
                  </Col>
                  <Col>{this.props.offer.sourceCountry}</Col>
                  <Col>{this.props.offer.expirationDate}</Col>
                  {this.props.ratingCalculations[this.props.offer.userId] != 'N/A' && <Col><Link to={this.state.url}> <ReactStars count={5} size={18} color2={'#ffd700'} value={parseInt(this.props.ratingCalculations[this.props.offer.userId])} edit={false} /></Link></Col>}

                  {this.props.ratingCalculations[this.props.offer.userId] == 'N/A' && <Col>N/A</Col>}
                </Row>
              </ListGroup.Item>
              <div className="mt-5">
                <label style={{ fontWeight: "bold" }}>
                  Select your offer for which you want to accept or counter the
                  offer
                </label>
                <Select
                  value={
                    this.state.selectedOption ? this.state.selectedOption : ""
                  }
                  onChange={this.handleChange}
                  options={this.state.offeroptions}
                />
              </div>
              <div className="d-flex justify-content-center mt-3 p-3">
                <button
                  className="btn btn-success mx-2"
                  onClick={() => {
                    this.setState({ myOffer: this.state.selectedOption.value });
                    this.accept(this.state.selectedOption.value);
                  }}
                >
                  Accept Offer
                </button>

                {this.props.offer.counterOfferAllowed === true ? (
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => {
                      this.setState({
                        myOffer: this.state.selectedOption.value,
                      });
                      this.counterModalOpen(this.props.offer);
                    }}
                  >
                    Counter Offer
                  </button>
                ) : (
                    ""
                  )}
              </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.spinner} size="sm" centered>
          <Modal.Body>
            <Row>
              <Col></Col>
              <Col>
                <div>
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              </Col>
              <Col></Col>
            </Row>
          </Modal.Body>
        </Modal>
        <CounterOffer
          myOffer={this.state.myOffer}
          selectedCounterOffer={this.state.selectedCounterOffer}
          counterModal={this.state.counterModal}
          counterModalClose={this.counterModalClose}
          submitCounterHandle={this.submitCounterHandle}
        />
      </div>
    );
  }
}

export default OfferModal;
