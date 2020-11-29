import React, { Component } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { address } from "../../js/helper/constant";

class NewUserData extends Component {
    state = {
        validated: false,
        userData: {
            emailId: this.props.user.email
        },
        countryArr: [],
        accountData1: {
            // countryName: "",
            // currency: this.state.currencyArr[0],
        },
        accountData2: {
            // countryName: this.state.countryArr[0],
            // currency: this.state.currencyArr[0],
        },

        // currencyArr: []
    }

    handleUserChange = e => {
        let userData = this.state.userData;
        userData[e.target.name] = e.target.value;
        this.setState({ userData })
    }
    handleAccount1Change = e => {
        console.log(e.target)
        console.log(e.target.value)
        let accountData1 = this.state.accountData1;
        accountData1[e.target.name] = e.target.value;
        this.setState({ accountData1 }, () => { console.log(this.state.accountData1) })
    }
    handleAccount2Change = e => {
        let accountData2 = this.state.accountData2;
        accountData2[e.target.name] = e.target.value;
        this.setState({ accountData2 })
    }
    componentDidMount() {
        this.getCountries();
    }
    getCountries = async () => {
        const countries = await axios.get(`${address}/country`);
        let countryArr = [];
        // let currencyArr = [];
        countries.data.map((country) => {
            countryArr.push({ name: country.country, currency: country.currency });
            // currencyArr.push({ value: country.currency, label: country.currency });
        });
        let accountData1 = this.state.accountData1;
        let accountData2 = this.state.accountData2;
        accountData1.countryName = countryArr[0].name;
        accountData1.primaryCurrency = countryArr[0].currency;
        accountData1.transactionType = "Send";
        accountData2.countryName = countryArr[0].name;
        accountData2.primaryCurrency = countryArr[0].currency;
        accountData2.transactionType = "Send";
        this.setState({ accountData1, accountData2, countryArr });
    }
    handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {

            e.stopPropagation();
            this.setState({ validated: true });
        } else {
            let data = {
                userDTO: this.state.userData,
                accountDTO1: this.state.accountData1,
                accountDTO2: this.state.accountData2,
            }
            this.props.handleNewUserSubmit(data);
        }
    }
    render() {
        return (
            <div align="center">
                <div className="show-grid form-row-style mt-5">
                    <Col className="form-div-style col-lg-5 col-sm-12 mb-5">

                        <Form id="contact-form-class">
                            <Form.Group controlId="formBasicEmail">
                                <h6>Enter Nickname</h6>
                                <Form.Control onChange={this.handleUserChange} value={this.state.userData.nickname} required name="nickname" type="text" placeholder="Enter Nickname" />
                                <Form.Text className="text-muted">
                                    Enter a unique nickname!
                                </Form.Text>
                            </Form.Group>

                            {/* <div style={{ color: "red" }}>
                                {this.props.submitMessage}
                            </div> */}
                        </Form>
                    </Col>
                    <h6 className="mt-5">Enter Account details below</h6>
                    <div className="text-muted">Note: Accounts should be from different countries</div>
                    <Form noValidate validated={this.state.validated} id="contact-form-class" onSubmit={this.handleSubmit}>
                        <div className="row mt-2 col-12 d-flex">

                            <div className="col-6">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Country 1 Bank Name</Form.Label>
                                    <Form.Control onChange={this.handleAccount1Change} value={this.state.accountData1.bankName} required name="bankName" type="text" placeholder="Bank name 1" />
                                    <Form.Label>Country Name</Form.Label>
                                    <Form.Control onChange={this.handleAccount1Change} value={this.state.accountData1.countryName} name="countryName" required as="select">
                                        {this.state.countryArr.map(country => <option value={country.name}>{country.name}</option>)}
                                    </Form.Control>
                                    <Form.Label>Account Number</Form.Label>
                                    <Form.Control onChange={this.handleAccount1Change} value={this.state.accountData1.accountNumber} required name="accountNumber" type="text" placeholder="Account number" />
                                    <Form.Label>Owner's Name</Form.Label>
                                    <Form.Control onChange={this.handleAccount1Change} value={this.state.accountData1.ownerName} required name="ownerName" type="text" placeholder="Owner name" />
                                    <Form.Label>Owner's Address</Form.Label>
                                    <Form.Control onChange={this.handleAccount1Change} value={this.state.accountData1.ownerAddress} required name="ownerAddress" type="text" placeholder="Owner Address" />
                                    <Form.Label>Primary Currency</Form.Label>
                                    <Form.Control onChange={this.handleAccount1Change} value={this.state.accountData1.primaryCurrency} required name="primaryCurrency" as="select">
                                        {this.state.countryArr.map(country => <option value={country.currency}>{country.currency}</option>)}
                                    </Form.Control>
                                    <Form.Label>Transaction Type</Form.Label>
                                    <Form.Control onChange={this.handleAccount1Change} value={this.state.accountData1.transactionType} required name="transactionType" as="select">
                                        <option value="Send">Send</option>
                                        <option value="Recieve">Recieve</option>
                                        <option value="Both">Both</option>
                                    </Form.Control>

                                </Form.Group>

                            </div>


                            <div className="col-6">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Country 2 Bank Name</Form.Label>
                                    <Form.Control onChange={this.handleAccount2Change} value={this.state.accountData2.bankName} required name="bankName" type="text" placeholder="Bank name 2" />
                                    <Form.Label>Country Name</Form.Label>
                                    <Form.Control onChange={this.handleAccount2Change} value={this.state.accountData2.countryName} name="countryName" required as="select">
                                        {this.state.countryArr.map(country => <option value={country.name}>{country.name}</option>)}
                                    </Form.Control>
                                    <Form.Label>Account Number</Form.Label>
                                    <Form.Control onChange={this.handleAccount2Change} value={this.state.accountData2.accountNumber} required name="accountNumber" type="text" placeholder="Account number" />
                                    <Form.Label>Owner's Name</Form.Label>
                                    <Form.Control onChange={this.handleAccount2Change} value={this.state.accountData2.ownerName} required name="ownerName" type="text" placeholder="Owner name" />
                                    <Form.Label>Owner's Address</Form.Label>
                                    <Form.Control onChange={this.handleAccount2Change} value={this.state.accountData2.ownerAddress} required name="ownerAddress" type="text" placeholder="Owner Address" />
                                    <Form.Label>Primary Currency</Form.Label>
                                    <Form.Control onChange={this.handleAccount2Change} value={this.state.accountData2.primaryCurrency} required name="primaryCurrency" as="select">
                                        {this.state.countryArr.map(country => <option value={country.currency}>{country.currency}</option>)}
                                    </Form.Control>
                                    <Form.Label>Transaction Type</Form.Label>
                                    <Form.Control onChange={this.handleAccount2Change} value={this.state.accountData2.transactionType} required name="transactionType" as="select">
                                        <option value="Send">Send</option>
                                        <option value="Recieve">Recieve</option>
                                        <option value="Both">Both</option>
                                    </Form.Control>

                                </Form.Group>
                                {/* <div style={{ color: "red" }}>
                                    {this.props.submitMessage}
                                </div> */}

                            </div>


                        </div>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </div>

            </div >
        );
    }
}

export default NewUserData;