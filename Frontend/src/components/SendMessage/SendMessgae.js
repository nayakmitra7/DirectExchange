import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../Navbar/navbar';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormCheck from 'react-bootstrap/FormCheck'
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import { toast } from 'react-toastify';
import './sendMessgae.css';
import { address } from '../../js/helper/constant';
import { Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

class SendMessage extends Component {
    constructor() {
        super();
        this.state = {
            userList: [],
            emailId: '',
            body: "",
            nickname: '',
            amount: '',
            spinner: false

        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        axios.get(address + '/user/messaging/' + localStorage.getItem("id")).then((response) => {
            if (response.status == 200) {
                this.setState({ userList: response.data });
                console.log(response.data)
            }
        }).catch((err) => {
            toast.error("Internal Error Occurred")
        })
    }
    populateUsers = () => {
        const userItems = [];
        this.state.userList.forEach(element => {
            if (element.id != parseInt(localStorage.getItem("id"))) {
                userItems.push(<option value={element.emailId}>{element.nickname}</option>);
            }
        });
        return userItems;
    }
    changeUser = (event) => {
        var selectedIndex = event.target.options.selectedIndex;
        this.setState({ emailId: event.target.value });
        this.setState({ nickname: event.target.options[selectedIndex].text });
    }
    sendMessage = (event) => {
        event.preventDefault();
        this.setState({spinner:true})
        let senderEmail = '';
        let senderNickname = '';
        this.state.userList.forEach((element) => {
            if (localStorage.getItem("id") == element.id) {
                senderEmail = element.emailId;
                senderNickname = element.nickname;
            }
        })
        console.log(this.state.amount.toString())
        let data1 = {
            "receiverEmail": this.state.emailId,
            "receiverNickname": this.state.nickname,
            "senderEmail": senderEmail,
            "senderNickname": senderNickname,
            "message": this.state.amount.toString()
        }
        console.log(data1)
        axios.post(address + '/user/messaging/send', data1).then((response) => {
            toast.success("Your message has been sent")
            this.setState({spinner:false})
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }).catch((error) => {
            toast.error("Internal Error Occurred");
        })
    }
    handleChange(event) {
        this.setState({ textMessage: event.target.value });
    }
    onBodyChange = e => {
        this.setState({
            body: e.target.value
        });
    };
    render() {

        return (
            <div>
                <Navbar></Navbar>
                <Container>
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
                    <Row>
                        <Col >
                            <Card className="card-post-offer">
                                <Card.Header className="card-header-post-offer" style={{ textAlign: 'center' }}><h2>Messaging </h2></Card.Header>

                                <Row>
                                    <Col className="margin-left-right-5-post-offer">
                                        <Form onSubmit={this.sendMessage}>

                                            <Row>
                                                <Col>
                                                    <Form.Group >
                                                        <Form.Label>To:</Form.Label>
                                                        <Form.Control as="select" required onChange={this.changeUser}>
                                                            <option></option>
                                                            {this.populateUsers()}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Group >
                                                        <Form.Label>Message: </Form.Label>
                                                        <Form.Control as="textarea" required onChange={(event) => this.setState({ amount: event.target.value })} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>



                                            <Card.Footer className="card-footer-post-offer">
                                                <Row>
                                                    <Col></Col>
                                                    <Col><Button variant="success" size="lg" type="submit" block >Send</Button></Col>
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
export default SendMessage;