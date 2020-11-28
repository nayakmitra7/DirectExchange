import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../Navbar/navbar';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import { toast } from 'react-toastify';
import './autoMatching.css';
import { address } from '../../js/helper/constant';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/esm/Button';
class AutoMatching extends Component {
    constructor() {
        super();
        this.state = {
            offerList: []
        }

    }
    componentDidMount() {
        axios.get(address + '/offerMatching/single/3').then((response) => {
            if (response.status == 200) {
                this.setState({ offerList: response.data })
            }
        }).catch(error => {
            toast.error("Internal error has occured", { position: 'top-center', autoClose: false })
        })
    }


    render() {
        let singleMatches = [];
        let splitMatches = [];
        let i = 0;
        this.state.offerList.forEach((element) => {
            let val = "" + i;
            i++;
            let inner = [];
            element.matchingOffer.forEach(offer => {
                inner.push(<ListGroup.Item>
                    <Row className="header-bold-auto-matching">
                        <Col>Offer ID</Col>
                        <Col>Username</Col>
                        <Col>Country(src)</Col>
                        <Col>Currency(src)</Col>
                        <Col>Amount(src)</Col>
                        <Col>Amount(Des)</Col>
                        <Col>Country(Des)</Col>
                        <Col>Currency(Des)</Col>
                        <Col>Exp Date</Col>
                        
                    </Row>
                    <Row>
                        <Col>#{offer.id}</Col>
                        <Col>Username</Col>
                        <Col>{offer.sourceCountry}</Col>
                        <Col>{offer.sourceCurrency}</Col>
                        <Col>{offer.amountInSrc}</Col>
                        <Col>{offer.amountInDes}</Col>
                        <Col>{offer.destinationCountry}</Col>
                        <Col>{offer.destinationCurrency}</Col>
                        <Col>{offer.expirationDate}</Col>
                        
                    </Row>
                    <Row className="margin-top-1-auto-matching">
                        <Col md ="1.5">
                            <Button variant="success" size="sm">Accept Offer</Button>
                        </Col>
                        
                        {offer.counterOfferAllowed && <Col md ="2">
                            <Button size="sm"> Counter Offer</Button>
                        </Col>}
                    </Row>
                </ListGroup.Item>)
            })
            singleMatches.push(
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={val} className="gray-auto-matching">
                        <ListGroup.Item variant="secondary" className="list-group-style-auto-matching ">
                            <Row className="header-bold-auto-matching ">
                            <Col>Offer ID</Col>
                            <Col>Username</Col>
                            <Col>Country(Des)</Col>
                            <Col>Currency(Des)</Col>
                            <Col>Amount(Des)</Col>
                            <Col>Amount(src)</Col>
                            <Col>Country(src)</Col>
                            <Col>Currency(src)</Col>
                            <Col>Exp Date</Col>
                        </Row>
                            <Row>
                                <Col>#{element.offer.id}</Col>
                                <Col>Username</Col>
                                <Col>{element.offer.destinationCountry}</Col>
                                <Col>{element.offer.destinationCurrency}</Col>
                                <Col>{element.offer.amountInDes}</Col>
                                <Col>{element.offer.amountInSrc}</Col>
                                <Col>{element.offer.sourceCountry}</Col>
                                <Col>{element.offer.sourceCurrency}</Col>
                                <Col>{element.offer.expirationDate}</Col>
                            </Row>
                        </ListGroup.Item></Accordion.Toggle>
                    <Accordion.Collapse eventKey={val}>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {inner}
                            </ListGroup>
                        </Card.Body>

                    </Accordion.Collapse>
                </Card>
            )
        })
        return (
            <div>
                <Navbar></Navbar>
                
                    <Row >
                        <Col className="margin-top-auto-matching" >
                            <Tabs defaultActiveKey="single" >
                                <Tab eventKey="single" title="Single Matches">
                                    <Accordion defaultActiveKey="0" className="margin-top-auto-matching">
                                        {singleMatches.length == 0 && <h5 className="margin-top-22-auto-matching">No rows available</h5>}

                                        {singleMatches}
                                    </Accordion>
                                </Tab>
                                <Tab eventKey="split" title="Split Matches">
                                        {splitMatches.length == 0 && <h5 className="margin-top-22-auto-matching">No rows available</h5>}
                                        {splitMatches}
                                </Tab>

                            </Tabs>

                        </Col>
                    </Row>
                
            </div>
        )
    }
}
//export Home Component
export default AutoMatching;