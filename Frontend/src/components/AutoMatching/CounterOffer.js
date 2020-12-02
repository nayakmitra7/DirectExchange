import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CounterOffer extends Component {
    state = {}
    render() {
        var myOffer = this.props.myOffer;
        var selectedCounterOffer = this.props.selectedCounterOffer;
        return (
            <div>
                {myOffer &&
                    <Modal show={this.props.counterModal} onHide={this.props.counterModalClose} size="lg">
                        <Modal.Header>
                            <Modal.Title>Counter Offer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col className="header-bold-auto-matching">Offer ID</Col>
                                            <Col>#{selectedCounterOffer.id}</Col>
                                        </Row>
                                        <Row>
                                            <Col className="header-bold-auto-matching">Username</Col>
                                            <Col>{selectedCounterOffer.nickname}</Col>
                                        </Row>
                                        <Row>
                                            <Col className="header-bold-auto-matching">Country(src)</Col>
                                            <Col>{selectedCounterOffer.sourceCountry}</Col>
                                        </Row>
                                        <Row>
                                            <Col className="header-bold-auto-matching">Amount(src)</Col>
                                            <Col>{selectedCounterOffer.amountInSrc}  {selectedCounterOffer.sourceCurrency}</Col>
                                        </Row>
                                        <Row>
                                            <Col className="header-bold-auto-matching">Counter Amount(src) to request</Col>
                                            <Col><input required value={this.state.counterAmtRequest} onChange={this.setCounterAmtRequest} min={selectedCounterOffer.amountInSrc * 0.9} max={selectedCounterOffer.amountInSrc * 1.1} placeholder={"Between " + selectedCounterOffer.amountInSrc * 0.9 + " - " + selectedCounterOffer.amountInSrc * 1.1} />{/*selectedCounterOffer.amountInDes*/} {selectedCounterOffer.sourceCurrency}</Col>
                                        </Row>
                                        <Row>
                                            <Col className="header-bold-auto-matching">Amount(des)</Col>
                                            <Col>{selectedCounterOffer.amountInDes}  {selectedCounterOffer.destinationCurrency}</Col>
                                        </Row>
                                        <Row>
                                            <Col className="header-bold-auto-matching">Country(des)</Col>
                                            <Col>{selectedCounterOffer.destinationCurrency}</Col>
                                        </Row>
                                        <Row>
                                            <Col className="header-bold-auto-matching">Exp Date</Col>
                                            <Col>{selectedCounterOffer.expirationDate}</Col>
                                        </Row>

                                    </Col>
                                </Row>
                                <div align="right">
                                    <Button variant="secondary" onClick={this.props.counterModalClose} className="mr-2 mt-3">Close</Button>
                                    <Button type="submit" variant="success" onClick={() => this.props.submitCounterHandle(this.state.counterAmtRequest)} className="mt-3">Counter offer</Button>
                                </div>
                            </Form>
                        </Modal.Body>

                    </Modal>
                }
            </div>
        );
    }
}

export default CounterOffer;