import React, { Component } from 'react';
import firebase from "firebase";
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
class Verification extends Component {
    state = {}
    render() {
        return (
            <div align="center" className="show-grid form-row-style mt-5 mb-5" style={{ padding: "50px" }}>
                <h3 className="m-5">Please verify your email. Check you inbox!</h3>
                <Container className="p-5">
                    {/* <h5 className="mb-3">Please verify your email. Check you inbox!</h5> */}
                    <div>
                        <button className="veri-btn btn btn-outline-success mb-1"
                            onClick={() => {
                                firebase.auth().currentUser.sendEmailVerification();
                                toast.success("Email sent. Please verify", { position: 'top-center' });
                                this.setState({ verificationClicked: true, verificationMessage: "Email sent. Please verify" });
                            }}
                        >
                            Send Verification email
                        </button>
                    </div>
                    <div className="mb-5">
                        <button className="veri-btn btn btn-outline-success mt-3" onClick={() => {
                            window.location.reload();
                        }}>Refresh after verifying!</button>
                    </div>
                </Container>
            </div>);
    }
}

export default Verification;