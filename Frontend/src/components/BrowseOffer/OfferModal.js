import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { toast } from "react-toastify";
import { address } from "../../js/helper/constant";
import Select from "react-select";

class OfferModal extends Component {
  state = {
    modalShow: "none",
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(selectedOption);
  };

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    const offeroptions = [];
    axios
      .get(`${address}/offer/` + localStorage.getItem("id") + `/open`)
      .then((response) => {
        // console.log(response.data);
        this.setState({ openOffers: response.data },()=>{
          //console.log(this.state.openOffers)
          this.state.openOffers.map((offer) =>
          offeroptions.push({ label: offer.id, value: offer })
     
        );
        });
       this.setState({offeroptions})
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: false,
        });
      });
     // console.log(offeroptions)
   
  }
  render() {
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
                <h1>John's Offer Details</h1>
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
                </Row>
              </ListGroup.Item>
              <div>
                <label style={{ fontWeight: "bold" }}>
                  Select your offer for which you want to accept the offer
                </label>
                <Select
                  value={
                    this.state.selectedOption
                      ? this.state.selectedOption
                      : ""
                  }
                  onChange={this.handleChange}
                  options={this.state.offeroptions}
                />
              </div>
              <div className="d-flex justify-content-center mt-3 p-3">
                <button className="btn btn-success mx-2">Accept Offer</button>

                {this.props.offer.counterOfferAllowed === true ? (
                  <button className="btn btn-danger mx-2">Counter Offer</button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OfferModal;
