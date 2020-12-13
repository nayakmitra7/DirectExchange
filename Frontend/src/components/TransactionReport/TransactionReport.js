import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Card from "react-bootstrap/Card";
import './TransactionReport.css'
import { address } from "../../js/helper/constant";
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spinner } from 'react-bootstrap';

class TransactionReport extends Component {
    constructor() {
        super();
        this.state = {
            report: '',
            spinner:true
        }
    }
    componentDidMount() {
        axios.get(address + '/transaction/report').then((response) => {

            this.setState({ report: response.data, spinner:false });
        })
    }
    render() {
        const columns = [
            {
                Header: "Year",
                accessor: "year",
                width: 150
            },
            {
                Header: "Month",
                accessor: "month",
                width: 200
            },

            {
                Header: "Completed Transactions",
                accessor: "completedTransactionCount",
            },
            {
                Header: "Aborted Transactions(Count)",
                accessor: "abortedTransactionCount",
            },
            {
                Header: "Total Remitted Amount(in USD)",
                accessor: "transferedSum",
                width: 250
            },
            {
                Header: "Total Service Fee(in USD)",
                accessor: "serviceFeeCollected",
            },
        ];
        return (
            <div>
                <Navbar></Navbar>
                <Modal show={this.state.spinner} size="sm" centered>

                    <Modal.Body>
                        <Row>
                            <Col></Col>
                            <Col><div>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div ></Col>
                            <Col></Col>
                        </Row>

                    </Modal.Body>

                </Modal>
                <Card className="card-transaction-report margin-left-right-5-transaction-report">
                    <Card.Header
                        className="card-header-transaction-report"
                        style={{ textAlign: "center" }}
                    >
                        <h2>System Financial Report</h2>
                    </Card.Header>
                    {this.state.report && <ReactTable className="trans-report"
                        data={this.state.report}
                        columns={columns}
                        showPagination={false}
                        defaultPageSize={12}
                    />}
                </Card>
            </div>
        )
    }
}
//export Home Component
export default TransactionReport;