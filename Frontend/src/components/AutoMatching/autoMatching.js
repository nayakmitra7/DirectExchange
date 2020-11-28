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
        let accordian = [];
        let i = 0;
        this.state.offerList.forEach((element) => {
            let val = "" + i;
            i++;
            let inner = [];
            element.matchingOffer.forEach(offer => {
                console.log(offer)
                inner.push(<ListGroup.Item>
                    <Row className="header-bold-auto-matching">
                        <Col>Offer ID</Col>
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
            accordian.push(
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={val} >{element.offer.id}</Accordion.Toggle>
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
        /*for (let i = 0; i < 2; i++) {
            let val = "" + i;
            let inner = [];
            for(let i = 0; i< 2; i++){
                inner.push(<ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>)
            }
            accordian.push(
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={val} >
                        Click me! </Accordion.Toggle>
                    <Accordion.Collapse eventKey={val}>
                        <Card.Body>
                            <ListGroup>
                                {inner}
                            </ListGroup>
                        </Card.Body>
                       
                    </Accordion.Collapse>
                </Card>
            )
        }*/
        return (
            <div>
                <Navbar></Navbar>
                <Container>
                    <Row className="margin-top-auto-matching">
                        <Col >
                            <Tabs defaultActiveKey="single" >
                                <Tab eventKey="single" title="Single Matches">
                                    <Accordion defaultActiveKey="0" className="margin-top-auto-matching">
                                        {accordian}
                                    </Accordion>
                                </Tab>
                                <Tab eventKey="split" title="Split Matches">
                                </Tab>

                            </Tabs>

                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
//export Home Component
export default AutoMatching;