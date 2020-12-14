import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../Navbar/navbar';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import { toast } from 'react-toastify';
import './autoMatching.css';
import { address, COUNTEROFFER_OPEN } from '../../js/helper/constant';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import CounterOffer from './CounterOffer';
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
            modalShowSplit: false,
            sourceAmountChange: 0,
            destinationAmount: 0,
            counterModal: false,
            myOffer: {},
            selectedCounterOffer: {},
            spinner: true,
            offer2: '',
            offer1: '',
            list: [],
            isCounterSplit: false
        }
        this.acceptSplit = this.acceptSplit.bind(this);
        this.accept = this.accept.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.counterModalOpen = this.counterModalOpen.bind(this);
        this.counterModalClose = this.counterModalClose.bind(this);
        this.setStateSourceAmount = this.setStateSourceAmount.bind(this);
        this.acceptModal = this.acceptModal.bind(this);
        this.handleOpenSplit = this.handleOpenSplit.bind(this);
    }
    componentDidMount() {
        axios.get(address + '/offerMatching/single/' + this.state.offerId).then((response) => {
            if (response.status == 200 && response.data.offer) {
                console.log(response.data)
                this.setState({ singleOfferList: response.data, offerExists: 1, offerSrcAmount: response.data.offer.amountInSrc, sourceAmountChange: response.data.offer.amountInSrc, offer1: response.data.offer, myOffer: response.data.offer, spinner:false })
            }
        }).catch(error => {
            toast.error("Internal error has occured 1", { position: 'top-center', autoClose: false })
        })
        axios.get(address + '/offerMatching/split/' + this.state.offerId).then((response) => {
            if (response.status == 200) {
                console.log(response.data)
                this.setState({ splitOfferList: response.data, offerExists: 1 })
            }
        }).catch(error => {
            toast.error("Internal error has occured 2", { position: 'top-center', autoClose: false })
        })
    }
    handleClose = () => {
        this.setState({ modalShow: false, modalShowSplit: false })
    };
    handleOpen = (offer2) => {
        this.setState({ modalShow: true, destinationAmount: offer2.amountInDes, offer2: offer2 })
    };
    handleOpenSplit = (list) => {
        this.setState({ modalShowSplit: true, list: list })
    };
    setStateSourceAmount = (event) => {
        this.setState({ sourceAmountChange: event.target.value })
    }
    acceptSplit = (list) => {
        this.handleClose()
        this.setState({ spinner: true });

        let data = { isSplit: true, offerId1: list[0].id, offerId2: list[1].id, offerId3: list[2].id, offerUserId1: list[0].userId, offerUserId2: list[1].userId, offerUserId3: list[2].userId }
        console.log(data)
        axios.post(address + "/threePartyTransaction", data).then((response) => {
            if (response.status == 200) {
                this.setState({ spinner: false })
                toast.success("Your offer has now entered in transaction mode");
                axios.get(address + '/offerMatching/split/' + this.state.offerId).then((response) => {
                    console.log(response.data)
                    if (response.status == 200) {
                        this.setState({ splitOfferList: [], singleOfferList: [] })
                    }
                }).catch(error => {
                    toast.error("Internal error has occured", { position: 'top-center', autoClose: false })
                })

            }
        }).catch((error) => {
            toast.error("Internal Error Occured");
        })
    }
    accept = (offer2) => {
        this.handleClose()
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
                        this.setState({ singleOfferList: [], splitOfferList: [] })
                    }
                }).catch(error => {
                    toast.error("Internal error has occured", { position: 'top-center', autoClose: false })
                })

            }
        }).catch((error) => {
            toast.error("Internal Error Occured");
        })
    }
    acceptModal = () => {

        if (this.state.destinationAmount == this.state.sourceAmountChange) {
            const params = {
                id: this.state.offerId,
                amountInSrc: this.state.sourceAmountChange
            }
            axios.put(address + '/offer?id=' + this.state.offerId + '&amountInSrc=' + this.state.sourceAmountChange, params).then((response) => {
                if (response.status == 200) {
                    this.accept(this.state.offer2);
                }
            }).catch(() => {
                toast.error("Internal Error Occurred")
            })
        } else {
            toast.error("The offers must match")
        }
    }
    acceptModalSplit = () => {
        let destAmount = 1 * this.state.list[0].amountInDes;
        let srcAmount1 = 1 * this.state.list[1].amountInSrc;
        let srcAmount2 = 1 * this.state.list[2].amountInSrc;

        let srcAmount = 1 * this.state.list[0].amountInSrc;
        let desAmount1 = 1 * this.state.list[1].amountInDes;
        let desAmount2 = 1 * this.state.list[2].amountInDes;
        console.log(srcAmount1 + " " + this.state.sourceAmountChange + " = " + destAmount);
        console.log(srcAmount2 + " " + this.state.sourceAmountChange + " = " + destAmount);
        console.log(srcAmount1 + " " + srcAmount2 + " = " + this.state.sourceAmountChange);
        console.log(desAmount1 + " " + this.state.sourceAmountChange + " = " + srcAmount);
        console.log(desAmount2 + " " + this.state.sourceAmountChange + " = " + srcAmount);
        console.log(desAmount1 + " " + desAmount2 + " = " + this.state.sourceAmountChange);

        if (srcAmount1 + 1 * this.state.sourceAmountChange == destAmount || srcAmount2 + 1 * this.state.sourceAmountChange == destAmount || srcAmount1 + srcAmount2 == this.state.sourceAmountChange || desAmount1 + desAmount2 == this.state.sourceAmountChange || desAmount1 + this.state.sourceAmountChange == srcAmount || desAmount2 + this.state.sourceAmountChange == srcAmount) {
            const params = {
                id: this.state.offerId,
                amountInSrc: this.state.sourceAmountChange
            }
            axios.put(address + '/offer?id=' + this.state.offerId + '&amountInSrc=' + this.state.sourceAmountChange, params).then((response) => {
                if (response.status == 200) {
                    this.acceptSplit(this.state.list);
                }
            }).catch(() => {
                toast.error("Internal Error Occurred")
            })
        } else {
            toast.error("The offers must match")
        }
    }
    //Kena
    counterModalOpen = (selectedCounterOffer) => {
        console.log("counter open")
        this.setState({ counterModal: true, selectedCounterOffer })
    }
    counterModalClose = () => {
        this.setState({ counterModal: false })
    }
    submitCounterHandle = async (e, counterAmtFromSrcToTgt) => {
        e.preventDefault();
        
        console.log("In submitCounterOffer")
        let minBound = this.state.selectedCounterOffer.amountInSrc * 0.9;
        let maxBound = this.state.selectedCounterOffer.amountInSrc * 1.1;
        let withinRange = minBound <= counterAmtFromSrcToTgt && counterAmtFromSrcToTgt <= maxBound;
        if (withinRange) {
            this.setState({ spinner: true });
            axios
                .post(address + '/offerMatching/counterOffer', { srcOfferDTO: this.state.myOffer, tgtOfferDTO: this.state.selectedCounterOffer, otherOfferDTO: this.state.otherOffer, counterAmtFromSrcToTgt, counterCurrencyFromSrcToTgt: this.state.selectedCounterOffer.sourceCurrency, counterStatus: COUNTEROFFER_OPEN })
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ spinner: false });
                        toast.success("Counter offer email has been sent to " + this.state.selectedCounterOffer.nickname);
                        this.setState({ singleOfferList: [], splitOfferList: [], counterModal: false })
                    }
                })
                .catch(err => {
                    toast.error("Error in making the counter offer");
                })
        } else {
            toast.error("Amount entered must be within the mentioned range");
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
            let val = i + "";
            i++;
            let innerSplit = [];
            let sumSource = 0;
            let sumDest = 0;
            let list = [];
            list.push(element.offer);
            element.matchingOffer.forEach((offer) => {
                sumSource += offer.amountInSrc;
                sumDest += offer.amountInDes;
                list.push(offer);
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


                        <Col>Country(src)</Col>
                        <Col>Currency(src)</Col>
                        <Col>Amount(src)</Col>
                        <Col>Amount(des)</Col>
                        <Col>Currency(des)</Col>

                        <Col>Country(des)</Col>

                        <Col>Exp Date</Col>

                    </Row>
                    <Row>
                        <Col>#{element.offer.id}</Col>
                        <Col>{element.offer.nickname}</Col>

                        <Col>{element.offer.sourceCountry}</Col>
                        <Col>{element.offer.sourceCurrency}</Col>
                        <Col>{element.offer.amountInSrc}</Col>
                        <Col>{element.offer.amountInDes}</Col>
                        <Col>{element.offer.destinationCurrency}</Col>
                        <Col>{element.offer.destinationCountry}</Col>
                        <Col>{element.offer.expirationDate}</Col>

                    </Row>

                </ListGroup.Item>

            )
            if (element.offer.userId == this.state.userId) { //A=B+C
                innerSplit.push(<Row className="margin-top-1-auto-matching">
                    <Col md="5"></Col>
                    {sumDest == element.offer.amountInSrc && <Col md="1.5">
                        <Button variant="success" size="sm" onClick={() => this.acceptSplit(list)}>Accept Offer</Button>
                    </Col>}
                    {sumDest != element.offer.amountInSrc && <Col md="1.5">
                        <Button variant="danger" size="sm" onClick={() => { this.handleOpenSplit(list) }}>Modify My Offer</Button>
                    </Col>}

                    <Col md="2">
                        <Button size="sm"
                            onClick={() => {
                                let myOffer = element.offer;
                                let otherOffer = null;
                                let selectedCounterOffer = null;
                                if (element.matchingOffer[0].amountInSrc > element.matchingOffer[1].amountInSrc) {
                                    selectedCounterOffer = element.matchingOffer[0];
                                    otherOffer = element.matchingOffer[1];
                                } else {
                                    selectedCounterOffer = element.matchingOffer[1];
                                    otherOffer = element.matchingOffer[0];
                                }

                                this.setState({
                                    myOffer,
                                    isCounterSplit: true,
                                    otherOffer,
                                    currentCounterDiff: element.offer.amountInDes - (element.matchingOffer[0].amountInSrc + element.matchingOffer[1].amountInSrc)
                                });
                                this.counterModalOpen(selectedCounterOffer)
                            }}> Counter Offer</Button>
                    </Col>
                </Row>)
            } else { //A+B=C //C-B
                innerSplit.push(<Row className="margin-top-1-auto-matching">
                    <Col md="5"></Col>
                    {sumSource == element.offer.amountInDes && <Col md="1.5">
                        <Button variant="success" size="sm" onClick={() => this.acceptSplit(list)}>Accept Offer</Button>
                    </Col>}
                    {sumSource != element.offer.amountInDes && <Col md="1.5">
                        <Button variant="danger" size="sm" onClick={() => { this.handleOpenSplit(list) }}>Modify My Offer</Button>
                    </Col>}

                    <Col md="2">
                        <Button size="sm"
                            onClick={() => {
                                let myOffer = element.matchingOffer.filter(o => o.userId == localStorage.getItem("id"))
                                let otherOffer = element.matchingOffer.filter(o => o.userId != localStorage.getItem("id"))
                                console.log(myOffer.amountInDes, element.offer.amountInSrc, otherOffer.amountInDes)
                                this.setState({
                                    myOffer: myOffer[0],
                                    otherOffer: otherOffer[0],
                                    isCounterSplit: true,
                                    currentCounterDiff: myOffer[0].amountInDes - (element.offer.amountInSrc - otherOffer[0].amountInDes)
                                });
                                this.counterModalOpen(element.offer);
                            }}> Counter Offer</Button>
                        {/* <Button size="sm"
                            onClick={() => {
                                this.setState({
                                    myOffer: element.offer,
                                    isCounterSplit: true,
                                    currentCounterDiff: element.offer.amountInDes - (element.matchingOffer[0].amountInSrc + element.matchingOffer[1].amountInSrc)
                                });
                                this.counterModalOpen(element.matchingOffer[0].amountInSrc > element.matchingOffer[1].amountInSrc ? element.matchingOffer[0] : element.matchingOffer[1])
                            }}> Counter Offer</Button> */}
                    </Col>
                </Row>)
            }
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



        this.state.singleOfferList.matchingOffer != undefined && this.state.singleOfferList.matchingOffer.forEach(offer => {
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
                        <Button variant="danger" size="sm" onClick={() => { this.handleOpen(offer) }}>Modify My Offer</Button>
                    </Col>}
                    {offer.counterOfferAllowed && this.state.offerSrcAmount != offer.amountInDes && <Col md="2">
                        <Button size="sm" onClick={() => this.counterModalOpen(offer)}> Counter Offer</Button>
                    </Col>}
                </Row>
            </ListGroup.Item>)

        })
        inner.length > 0 && singleMatches.push(

            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" className="gray-auto-matching">
                    <ListGroup.Item variant="secondary" className="list-group-style-auto-matching ">
                        <Row className="margin-bottom-offer"><u><strong>My selected Offer:</strong></u></Row>
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
                            <ListGroup.Item><Row className="margin-bottom-offer"><strong>List of matching offers:</strong></Row></ListGroup.Item>
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
                {this.state.singleOfferList.offer != undefined && <Modal show={this.state.modalShow} onHide={this.handleOpen} size="lg">
                    <Modal.Header>
                        <Modal.Title>Offer Modification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col className="header-bold-auto-matching">Offer ID</Col>
                                        {this.state.singleOfferList.offer != undefined && <Col>#{this.state.singleOfferList.offer.id}</Col>}
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
                </Modal>}
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
                {this.state.singleOfferList.offer != undefined && <Modal show={this.state.modalShowSplit} onHide={this.handleOpenSplit} size="lg">
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
                        <Button variant="success" onClick={this.acceptModalSplit} >Accept offer</Button>
                    </Modal.Footer>
                </Modal>}
                {console.log(this.state.selectedCounterOffer.amountInSrc, "||", this.state.currentCounterDiff)}
                <CounterOffer
                    myOffer={this.state.myOffer}
                    selectedCounterOffer={this.state.selectedCounterOffer}
                    counterModal={this.state.counterModal}
                    counterModalClose={this.counterModalClose}
                    submitCounterHandle={this.submitCounterHandle}
                    isCounterSplit={this.state.isCounterSplit || false}
                    validCounterAmtSplit={parseFloat(this.state.selectedCounterOffer.amountInSrc) + parseFloat(this.state.currentCounterDiff)}
                />
            </div>
        )
    }
}
//export Home Component
export default AutoMatching;