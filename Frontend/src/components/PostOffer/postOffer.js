import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../Navbar/navbar';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormCheck from 'react-bootstrap/FormCheck'

import Card from 'react-bootstrap/Card'
import { toast } from 'react-toastify';
import './postOffer.css';

class PostOffer extends Component {
    constructor() {
        super();
        this.state = {
            hasMetRequirement: true,
            sourceCountry:'',
            destinationCountry:'',
            sourceCurrency: '',
            destinationCurrency:'',
            todayDate: new Date().toISOString().split("T")[0],
            counterOfferFlag: true,
            splitOfferFlag: true,
            exchangeRate:'',
            expirationDate:'',
            countries:[{Country:"USA",Currency:"Dollar",ExchangeRate:"1"},{Country:"India",Currency:"Rupees",ExchangeRate:"70"},{Country:"Japan",Currency:"Yen",ExchangeRate:"100"}]
        }
        this.sourceCurrencyPopulate = this.sourceCurrencyPopulate.bind(this);
        this.destinationCurrencyPopulate = this.destinationCurrencyPopulate.bind(this);
        this.populateSourceCountries = this.populateSourceCountries.bind(this);
        this.populateDestinationCountries = this.populateDestinationCountries.bind(this);
        this.toggleCounter = this.toggleCounter.bind(this);
        this.toggleSplit = this.toggleSplit.bind(this);
        this.setDate = this.setDate.bind(this);

    }
    componentDidMount() {
        if (!this.state.hasMetRequirement) {
            toast.error("Please enroll atleast 2 bank accounts to avail the service !", { position: 'top-center', autoClose:false });
        }
    }

    populateSourceCountries() {
        const countryItem = [];
        this.state.countries.forEach(element => {
            countryItem.push(<option value={element.Currency}>{element.Country}</option>);
        }); 
        return countryItem;
    }
    populateDestinationCountries(value) {
        const countryItem = [];
        this.state.countries.forEach(element => {
            if(element.Country != (value) ){
                countryItem.push(<option value={element.Currency}>{element.Country}</option>);
            }
        }); 
        return countryItem;
    }
    sourceCurrencyPopulate(event) {
        var selectedIndex = event.target.options.selectedIndex;
        this.setState({ sourceCurrency: event.target.value });
        this.setState({ sourceCountry: event.target.options[selectedIndex].text });
    }
    destinationCurrencyPopulate(event) {
        var selectedIndex = event.target.options.selectedIndex;
        this.setState({ destinationCurrency: event.target.value });
        this.setState({ destinationCountry: event.target.options[selectedIndex].text });
        this.setState({exchangeRate:29});
    }
    toggleCounter() {
        this.setState(prevState => ({ counterOfferFlag: !prevState.counterOfferFlag }))
    }
    toggleSplit() {
        this.setState(prevState => ({ splitOfferFlag: !prevState.splitOfferFlag }))
    }
    setDate(event){
        console.log(event.target.value);
        this.setState({expirationDate:event.target.value});
        
    }
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <Container>
                    <Row>
                        <Col >
                            <Card className="card">
                                <Card.Header className="card-header" style={{textAlign:'center'}}><h2>Post Offer</h2></Card.Header>
                                
                                <Row>
                                    <Col className="margin-left-right-5">
                                        <Form>

                                            <Row>
                                                <Col>
                                                    <Form.Group >
                                                        <Form.Label>Source Country</Form.Label>
                                                        <Form.Control as="select" onChange={this.sourceCurrencyPopulate} required>
                                                            <option></option>
                                                            {this.populateSourceCountries()}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group >
                                                        <Form.Label>Source Currency</Form.Label>
                                                        <Form.Control placeholder={this.state.sourceCurrency} readOnly />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Group >
                                                        <Form.Label>Amount to Remit</Form.Label>
                                                        <Form.Control type="number" required/>
                                                        <Form.Text className="text-muted">In source currency</Form.Text>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Group >
                                                        <Form.Label>Destination Country</Form.Label>
                                                        <Form.Control as="select" onChange={this.destinationCurrencyPopulate} required disabled={this.state.sourceCurrency.toString().length == 0} required>
                                                        <option></option>
                                                            {this.populateDestinationCountries(this.state.sourceCountry)}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group >
                                                        <Form.Label>Destination Currency</Form.Label>
                                                        <Form.Control placeholder={this.state.destinationCurrency} readOnly />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Group >
                                                        <Form.Label>Exchange Rate</Form.Label>
                                                        <Form.Control placeholder={this.state.exchangeRate} readOnly />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Group >
                                                        <Form.Label>Expiration Date</Form.Label>
                                                        <Row>
                                                            <Col>
                                                                <input type="date" min={this.state.todayDate} onChange={this.setDate} required/>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                                
                                            </Row>
                                            <Row className="margin-top">
                                                <Col>
                                                    <Form.Group >
                                                        <FormCheck custom type="switch">
                                                            <FormCheck.Input checked={this.state.counterOfferFlag} />
                                                            <FormCheck.Label onClick={this.toggleCounter}>
                                                                Counter Offer
                                                            </FormCheck.Label>
                                                        </FormCheck>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group >
                                                        <FormCheck custom type="switch">
                                                            <FormCheck.Input checked={this.state.splitOfferFlag} />
                                                            <FormCheck.Label onClick={this.toggleSplit}>
                                                                Split Offer
                                                            </FormCheck.Label>
                                                        </FormCheck>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                    <Card.Footer className="card-footer">
                                            <Row>
                                                <Col></Col>
                                                <Col><Button variant="success" size="lg" type="submit" block disabled={!this.state.hasMetRequirement}>Post</Button></Col>
                                                <Col></Col>
                                            </Row>
                                            </Card.Footer>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
//export Home Component
export default PostOffer;