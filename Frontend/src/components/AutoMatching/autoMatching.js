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
            singleOfferList: [],
            splitOfferList: [],
            offerExists: 0,
            userId: 1
        }

    }
    componentDidMount() {
        axios.get(address + '/offerMatching/single/4').then((response) => {
            if (response.status == 200) {
                this.setState({ singleOfferList: response.data, offerExists: 1 })
            }
        }).catch(error => {
            toast.error("Internal error has occured", { position: 'top-center', autoClose: false })
        })
        axios.get(address + '/offerMatching/split/11').then((response) => {
            if (response.status == 200) {
                this.setState({ splitOfferList: response.data, offerExists: 1 })
            }
        }).catch(error => {
            toast.error("Internal error has occured", { position: 'top-center', autoClose: false })
        })
    }


    render() {
        let singleMatches = [];
        let splitMatches = [];
        let inner = [];
        let warning = "warning";
        let standard = "";
        let i = 0;
        this.state.splitOfferList.forEach((element) => {
            let val = "" + i;
            i++;
            let innerSplit = [];
            element.matchingOffer.forEach((offer) => {

                innerSplit.push(<ListGroup.Item variant={offer.userId == this.state.userId ? warning : standard}>
                    <Row className="header-bold-auto-matching">
                        <Col>Offer ID</Col>
                        <Col>Username</Col>
                        <Col>Country(src)</Col>
                        <Col>Currency(src)</Col>
                        <Col>Amount(src)</Col>
                        <Col>Amount(des)</Col>
                        <Col>Country(des)</Col>
                        <Col>Currency(des)</Col>
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

                </ListGroup.Item>)
            })
            innerSplit.push(<ListGroup.Item variant={element.offer.userId == this.state.userId ? warning : standard}>
                <Row className="header-bold-auto-matching">
                    <Col>Offer ID</Col>
                    <Col>Username</Col>
                    <Col>Country(des)</Col>
                    <Col>Currency(des)</Col>
                    <Col>Amount(des)</Col>
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

            </ListGroup.Item>)
            splitMatches.push(
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={val} className="gray-auto-matching header-bold-auto-matching">
                        <Row>
                            <Col md="8">Split Offer #{val}</Col>
                            <Col md="2">
                                <Button variant="success" size="sm"> Accept Offer</Button>
                            </Col>
                            <Col md="2">
                                <Button size="sm"> Counter Offer</Button>
                            </Col>
                        </Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={val}>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {innerSplit}
                            </ListGroup>
                        </Card.Body>

                    </Accordion.Collapse>
                </Card>)
        })
        this.state.offerExists > 0 && this.state.singleOfferList.matchingOffer.forEach(offer => {
            inner.push(<ListGroup.Item>
                <Row className="header-bold-auto-matching">
                    <Col>Offer ID</Col>
                    <Col>Username</Col>
                    <Col>Country(src)</Col>
                    <Col>Currency(src)</Col>
                    <Col>Amount(src)</Col>
                    <Col>Amount(des)</Col>
                    <Col>Country(des)</Col>
                    <Col>Currency(des)</Col>
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
                    <Col md="1.5">
                        <Button variant="success" size="sm">Accept Offer</Button>
                    </Col>

                    {offer.counterOfferAllowed && <Col md="2">
                        <Button size="sm"> Counter Offer</Button>
                    </Col>}
                </Row>
            </ListGroup.Item>)
        })
        this.state.offerExists > 0 && singleMatches.push(
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" className="gray-auto-matching">
                    <ListGroup.Item variant="secondary" className="list-group-style-auto-matching ">
                        <Row className="header-bold-auto-matching ">
                            <Col>Offer ID</Col>
                            <Col>Username</Col>
                            <Col>Country(des)</Col>
                            <Col>Currency(des)</Col>
                            <Col>Amount(des)</Col>
                            <Col>Amount(src)</Col>
                            <Col>Country(src)</Col>
                            <Col>Currency(src)</Col>
                            <Col>Exp Date</Col>
                        </Row>
                        <Row>
                            <Col>#{this.state.singleOfferList.offer.id}</Col>
                            <Col>Username</Col>
                            <Col>{this.state.singleOfferList.offer.destinationCountry}</Col>
                            <Col>{this.state.singleOfferList.offer.destinationCurrency}</Col>
                            <Col>{this.state.singleOfferList.offer.amountInDes}</Col>
                            <Col>{this.state.singleOfferList.offer.amountInSrc}</Col>
                            <Col>{this.state.singleOfferList.offer.sourceCountry}</Col>
                            <Col>{this.state.singleOfferList.offer.sourceCurrency}</Col>
                            <Col>{this.state.singleOfferList.offer.expirationDate}</Col>
                        </Row>
                    </ListGroup.Item></Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <ListGroup variant="flush">
                            {inner}
                        </ListGroup>
                    </Card.Body>

                </Accordion.Collapse>
            </Card>
        )

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
                                <Accordion defaultActiveKey="0" className="margin-top-auto-matching">
                                    {splitMatches.length == 0 && <h5 className="margin-top-22-auto-matching">No rows available</h5>}
                                    {splitMatches}
                                </Accordion>
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