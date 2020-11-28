import React, { Component } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
class NewUserData extends Component {
    state = { data: { emailId: this.props.user.email } }

    handleChange = e => {
        let data = this.state.data;
        data[e.target.name] = e.target.value;
        this.setState({ data })
    }

    render() {
        return (
            <div align="center">
                <div className="show-grid form-row-style mt-5">
                    <Col className="form-div-style col-lg-5 col-sm-12">

                        <Form id="contact-form-class" onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Enter Nickname</Form.Label>
                                <Form.Control onChange={this.handleChange} value={this.state.data.nickname} required name="nickname" type="text" placeholder="Enter Nickname" />
                                <Form.Text className="text-muted">
                                    Enter a unique nickname!
                                </Form.Text>
                            </Form.Group>
                            <Button onClick={(e) => { e.preventDefault(); this.props.handleNewUserSubmit(this.state.data) }} variant="primary" type="submit">
                                Submit
                            </Button>
                            <div style={{ color: "red" }}>
                                {console.log("message:", this.props.submitMessage)}
                                {this.props.submitMessage}
                            </div>
                        </Form>
                    </Col>
                </div>

            </div >
        );
    }
}

export default NewUserData;