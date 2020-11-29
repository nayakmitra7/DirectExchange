import React, { Component } from "react";
import "./Offer.css";

class MyOfferHeader extends Component {
  state = {};
  render() {
    return (
      <div className="container secondary-nav-approve">
        <nav className="navbar navbar-expand-lg navbar-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active mx-5">
                <a
                  className="nav-link "
                  href="/myoffer/open"
                  style={{ color: this.props.navarr[0] }}
                >
                  Open Offers <span className="sr-only"></span>
                </a>
              </li>
              <span style={{ height: "20px" }}>
                <hr width="1" size="500" className="nav-hr"></hr>
              </span>
              <li className="nav-item mx-5">
                <a
                  className="nav-link link-color"
                  style={{ color: this.props.navarr[1] }}
                  href="/myoffer/close"
                >
                  <span>Closed Offers</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <hr />
      </div>
    );
  }
}

export default MyOfferHeader;
