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

class Individualreport extends Component {
  state = {};
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
                <Select placeholder="Select Month" options={months}></Select>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Individualreport;
