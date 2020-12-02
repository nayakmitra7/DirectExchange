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
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';

class AutoMatching extends Component {
    constructor() {
        super();
        this.state = {
            singleOfferList: [],
            splitOfferList: [],
            offerExists: 0,
            userId: parseInt(localStorage.getItem("id")),
            offerId: parseInt(localStorage.getItem("autoMatchId")),
            offerSrcAmount: 0,
            modalShow: false,
            sourceAmountChange: 0,
            destinationAmount: 0,
            spinner: false
        }
        this.modify = this.modify.bind(this);
        this.accept = this.accept.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.setStateSourceAmount = this.setStateSourceAmount.bind(this);
        this.acceptModal = this.acceptModal.bind(this);

    }
    componentDidMount() {
        axios.get(address + '/offerMatching/single/' + this.state.offerId).then((response) => {
            console.log(response.data)
            if (response.status == 200) {
                this.setState({ singleOfferList: response.data, offerExists: 1, offerSrcAmount: response.data.offer.amountInSrc, sourceAmountChange: response.data.offer.amountInSrc })
            }
        }).catch(error => {
            toast.error("Internal error has occured", { position: 'top-center', autoClose: false })
        })
        axios.get(address + '/offerMatching/split/' + this.state.offerId).then((response) => {
            if (response.status == 200) {
                this.setState({ splitOfferList: response.data, offerExists: 1 })
            }
        }).catch(error => {
            toast.error("Internal error has occured", { position: 'top-center', autoClose: false })
        })
    }
    handleClose = () => {
        this.setState({ modalShow: false })
    };
    handleOpen = (destValue) => {
        console.log(destValue)
        this.setState({ modalShow: true, destinationAmount: destValue })
    };
    setStateSourceAmount = (event) => {
        this.setState({ sourceAmountChange: event.target.value })
    }
    modify = (id) => {

    }
    accept = (offer2) => {
        this.setState({ spinner: true });
        let data = { isSplit: false, offerId1: this.state.offerId, offerId2: offer2.id, offerUserId1: this.state.userId, offerUserId2: offer2.userId }
        console.log(data)
        axios.post(address + "/twoPartyTransaction", data).then((response) => {
            if (response.status == 200) {
                this.setState({ spinner: false })
                toast.success("Your offer has now entered in transaction mode");
                axios.get(address + '/offerMatching/single/' + this.state.offerId).then((response) => {
                    console.log(response.data)
                    if (response.status == 200) {
                        this.setState({ singleOfferList: response.data, offerExists: 1, offerSrcAmount: response.data.offer.amountInSrc, sourceAmountChange: response.data.offer.amountInSrc })
                    }
                }).catch(error => {
                    toast.error("Internal error has occured", { position: 'top-center', autoClose: false })
                })
                // setTimeout(() => {
                //     window.location.reload();
                // }, 2000);
            }
        }).catch((error) => {
            toast.error("Internal Error Occured");
        })
    }
    acceptModal = () => {
        if (this.state.destinationAmount == this.state.sourceAmountChange) {

        } else {
            toast.error("The offers must match")
        }
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
                        <Col>{offer.nickname}</Col>
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
            innerSplit.push(
                <ListGroup.Item variant={element.offer.userId == this.state.userId ? warning : standard}>
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
                        <Col>{element.offer.nickname}</Col>
                        <Col>{element.offer.destinationCountry}</Col>
                        <Col>{element.offer.destinationCurrency}</Col>
                        <Col>{element.offer.amountInDes}</Col>
                        <Col>{element.offer.amountInSrc}</Col>
                        <Col>{element.offer.sourceCountry}</Col>
                        <Col>{element.offer.sourceCurrency}</Col>
                        <Col>{element.offer.expirationDate}</Col>

                    </Row>

                </ListGroup.Item>

            )
            innerSplit.push(<Row className="margin-top-1-auto-matching">
                <Col md="5"></Col>
                <Col md="1.5">
                    <Button variant="success" size="sm">Accept Offer</Button>
                </Col>

                <Col md="2">
                    <Button size="sm"> Counter Offer</Button>
                </Col>
            </Row>)
            splitMatches.push(
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={val} className="gray-auto-matching header-bold-auto-matching">
                        Split Offer #{val}
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



        this.state.offerExists && this.state.singleOfferList.matchingOffer.forEach(offer => {
            inner.push(<ListGroup.Item>
                <Row className="header-bold-auto-matching">
                    <Col>Offer ID</Col>
                    <Col>Username</Col>
                    <Col>Country(src)</Col>
                    <Col>Amount(src)</Col>
                    <Col>Amount(des)</Col>
                    <Col>Country(des)</Col>
                    <Col>Exp Date</Col>

                </Row>
                <Row>
                    <Col>#{offer.id}</Col>
                    <Col>{offer.nickname}</Col>
                    <Col>{offer.sourceCountry}</Col>
                    <Col>{offer.amountInSrc} {offer.sourceCurrency}</Col>
                    <Col>{offer.amountInDes} {offer.destinationCurrency}</Col>
                    <Col>{offer.destinationCountry}</Col>
                    <Col>{offer.expirationDate}</Col>

                </Row>

                <Row className="margin-top-1-auto-matching">
                    <Col md="5"></Col>
                    {this.state.offerSrcAmount == offer.amountInDes && <Col md="1.5">
                        <Button variant="success" size="sm" onClick={() => this.accept(offer)}>Accept Offer</Button>
                    </Col>}
                    {this.state.offerSrcAmount != offer.amountInDes && <Col md="1.5">
                        <Button variant="danger" size="sm" onClick={() => { this.handleOpen(offer.amountInDes) }}>Modify My Offer</Button>
                    </Col>}
                    {offer.counterOfferAllowed && this.state.offerSrcAmount != offer.amountInDes && <Col md="2">
                        <Button size="sm"> Counter Offer</Button>
                    </Col>}
                </Row>
            </ListGroup.Item>)

        })
        inner.length > 0 && singleMatches.push(

            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" className="gray-auto-matching">
                    <ListGroup.Item variant="secondary" className="list-group-style-auto-matching ">
                        <Row className="header-bold-auto-matching ">
                            <Col>Offer ID</Col>
                            <Col>Username</Col>
                            <Col>Country(des)</Col>
                            <Col>Amount(des)</Col>
                            <Col>Amount(src)</Col>
                            <Col>Country(src)</Col>
                            <Col>Exp Date</Col>
                        </Row>
                        <Row>
                            <Col>#{this.state.singleOfferList.offer.id}</Col>
                            <Col>{this.state.singleOfferList.offer.nickname}</Col>
                            <Col>{this.state.singleOfferList.offer.destinationCountry}</Col>
                            <Col>{this.state.singleOfferList.offer.amountInDes} {this.state.singleOfferList.offer.destinationCurrency}</Col>
                            <Col>{this.state.singleOfferList.offer.amountInSrc} {this.state.singleOfferList.offer.sourceCurrency}</Col>
                            <Col>{this.state.singleOfferList.offer.sourceCountry}</Col>
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
                                    {singleMatches.length > 0 && singleMatches}
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
                <Modal show={this.state.modalShow} onHide={this.handleOpen} size="lg">
                    <Modal.Header>
                        <Modal.Title>Offer Modification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col className="header-bold-auto-matching">Offer ID</Col>
                                        {this.state.offerExists && <Col>#{this.state.singleOfferList.offer.id}</Col>}
                                    </Row>
                                    <Row>
                                        <Col className="header-bold-auto-matching">Username</Col>
                                        {this.state.offerExists && <Col>{this.state.singleOfferList.offer.nickname}</Col>}
                                    </Row>
                                    <Row>
                                        <Col className="header-bold-auto-matching">Country(des)</Col>
                                        {this.state.offerExists && <Col>{this.state.singleOfferList.offer.destinationCountry}</Col>}
                                    </Row>
                                    <Row>
                                        <Col className="header-bold-auto-matching">Amount(des)</Col>
                                        {this.state.offerExists && <Col>{this.state.singleOfferList.offer.amountInDes} {this.state.singleOfferList.offer.destinationCurrency}</Col>}
                                    </Row>
                                    <Row>
                                        <Col className="header-bold-auto-matching">Amount(src)</Col>
                                        {this.state.offerExists && <Col><input value={this.state.sourceAmountChange} onChange={this.setStateSourceAmount} />  {this.state.singleOfferList.offer.sourceCurrency}</Col>}
                                    </Row>
                                    <Row>
                                        <Col className="header-bold-auto-matching">Country(src)</Col>
                                        {this.state.offerExists && <Col>{this.state.singleOfferList.offer.sourceCountry}</Col>}
                                    </Row>
                                    <Row>
                                        <Col className="header-bold-auto-matching">Exp Date</Col>
                                        {this.state.offerExists && <Col>{this.state.singleOfferList.offer.expirationDate}</Col>}
                                    </Row>

                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="success" onClick={this.acceptModal} >Accept offer</Button>
                    </Modal.Footer>
                </Modal>
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
            </div>
        )
    }
}
//export Home Component
export default AutoMatching;