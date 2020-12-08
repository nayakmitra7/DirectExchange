import React, { Component } from 'react';
import Navbar from "../Navbar/navbar"
import { Form, Col, Card, Container } from "react-bootstrap";
import Axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { address } from '../../js/helper/constant';
import { toast } from 'react-toastify';

class Account extends Component {
    state = {
        validated: false,
        isAddAccount: false,
        accountData: {
            userId: localStorage.getItem("id")
        },
        accounts: [],
        countryArr: []
    }
    componentDidMount() {
        this.getUserAccounts();
        this.getCountries();
    }
    getCountries = async () => {
        const countries = await Axios.get(`${address}/country`);
        let countryArr = [];
        // let currencyArr = [];
        countries.data.map((country) => {
            countryArr.push({ name: country.country, currency: country.currency });
            // currencyArr.push({ value: country.currency, label: country.currency });
        });
        let accountData = this.state.accountData;
        accountData.countryName = countryArr[0].name;
        accountData.primaryCurrency = countryArr[0].currency;
        accountData.transactionType = "Send";
        this.setState({ accountData, countryArr });
    }
    handleAccountChange = e => {
        let accountData = this.state.accountData;
        accountData[e.target.name] = e.target.value;
        this.setState({ accountData })
    }
    getUserAccounts = () => {
        Axios.get(address + `/user/account/${localStorage.getItem("id")}`)
            .then(res => {
                if (res.status == 200) {
                    this.setState({ accounts: res.data });
                }
            })
            .catch(err => {
                toast.error("Error in fetching user accounts");
            })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {

            e.stopPropagation();
            this.setState({ validated: true });
        } else {
            let accountDTO = this.state.accountData;
            Axios.post(address + `/user/account`, accountDTO)
                .then(res => {
                    if (res.status == 200) {
                        toast.success("Successfully added new account");
                        this.getUserAccounts();
                    }
                })
                .catch(err => {
                    toast.error("Error in adding new account");
                })
        }
        this.handleAccountToggle();
    }
    handleAccountToggle = () => {
        this.setState({ isAddAccount: !this.state.isAddAccount });
    }
    render() {
        return (<div>
            <Navbar />
            <Container>
                <Button variant="outline-primary" size="sm" className="mt-3" onClick={this.handleAccountToggle}>Add Account</Button>
                <hr />
                {this.state.isAddAccount ? (
                    <div align="center">
                        <div className="show-grid form-row-style">
                            <Col className="form-div-style px-5 pt-5">
                                <Form noValidate validated={this.state.validated} id="contact-form-class" onSubmit={this.handleSubmit}>
                                    <div>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Country 2 Bank Name</Form.Label>
                                            <Form.Control onChange={this.handleAccountChange} value={this.state.accountData.bankName} required name="bankName" type="text" placeholder="Bank name 2" />
                                            <Form.Label>Country Name</Form.Label>
                                            <Form.Control onChange={this.handleAccountChange} value={this.state.accountData.countryName} name="countryName" required as="select">
                                                {this.state.countryArr.map(country => <option value={country.name}>{country.name}</option>)}
                                            </Form.Control>
                                            <Form.Label>Account Number</Form.Label>
                                            <Form.Control onChange={this.handleAccountChange} value={this.state.accountData.accountNumber} required name="accountNumber" type="text" placeholder="Account number" />
                                            <Form.Label>Owner's Name</Form.Label>
                                            <Form.Control onChange={this.handleAccountChange} value={this.state.accountData.ownerName} required name="ownerName" type="text" placeholder="Owner name" />
                                            <Form.Label>Owner's Address</Form.Label>
                                            <Form.Control onChange={this.handleAccountChange} value={this.state.accountData.ownerAddress} required name="ownerAddress" type="text" placeholder="Owner Address" />
                                            <Form.Label>Primary Currency</Form.Label>
                                            <Form.Control onChange={this.handleAccountChange} value={this.state.accountData.primaryCurrency} required name="primaryCurrency" as="select">
                                                {this.state.countryArr.map(country => <option value={country.currency}>{country.currency}</option>)}
                                            </Form.Control>
                                            <Form.Label>Transaction Type</Form.Label>
                                            <Form.Control onChange={this.handleAccountChange} value={this.state.accountData.transactionType} required name="transactionType" as="select">
                                                <option value="Send">Send</option>
                                                <option value="Recieve">Recieve</option>
                                                <option value="Both">Both</option>
                                            </Form.Control>

                                        </Form.Group>



                                    </div>
                                    <Button variant="outline-success" size="sm" type="submit">
                                        Submit
                                    </Button>
                                    <Button className="ml-3" variant="outline-success" size="sm" onClick={this.handleAccountToggle}>Cancel</Button>
                                </Form>
                            </Col>
                        </div>
                    </div>) : ("")}
                {this.state.accounts.map(account => (
                    <Card className="mb-2">
                        <Card.Header>
                            <b>{account.bankName}</b>
                        </Card.Header>
                        <Card.Body>
                            <table >
                                <tr>
                                    <td>
                                        Account Number 
                                    </td>
                                    <td>:</td>
                                    <td style={{ color: "darkgray" }}>
                                        {account.accountNumber.substring(0, 4) + "-XXXX-XXXX-XXXX"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Country 
                                    </td>
                                    <td>:</td>
                                    <td style={{ color: "darkgray" }}>
                                        {account.countryName}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Address 
                                    </td>
                                    <td>:</td>
                                    <td style={{ color: "darkgray" }}>
                                        {account.ownerAddress}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Transaction Type 
                                    </td>
                                    <td>:</td>
                                    <td style={{ color: "darkgray" }}>
                                        {account.transactionType}
                                    </td>
                                </tr>
                            </table>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </div>);
    }
}

export default Account;