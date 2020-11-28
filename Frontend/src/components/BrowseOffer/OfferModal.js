import React, { Component } from "react";
import { Table } from "react-bootstrap";
class OfferModal extends Component {
  state = {
    modalShow: "none",
  };
  render() {
    return (
      <div>
        <div
          id="myModal"
          className="modal"
          style={{ display: this.props.modalShow }}
        >
          <div className="modal-content col-5" style={{ fontFamily: "Suisse" }}>
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

              <Table striped borderless hover variant="dark">
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
              </Table>
              <div className="d-flex justify-content-center mt-3 p-3">
                {this.props.offer.counterOfferAllowed === true ? (
                  <button className="btn btn-success mx-2">Counter Offer</button>
                ) : (
                  ""
                )}
                 {this.props.offer.splitOfferAllowed === true ? (
                  <button className="btn btn-danger mx-2">Split Offer</button>
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
