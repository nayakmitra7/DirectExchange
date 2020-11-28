import React, { Component } from 'react';
import firebase from "firebase";
import { Container } from 'react-bootstrap';
class Verification extends Component {
    state = {}
    render() {
        return (<div align="center" style={{ padding: "50px" }}>
            <Container>
                <h5 className="mb-3">Please verify your email. Check you inbox!</h5>
                <div><button className="veri-btn btn btn-outline-success mb-1"
                    onClick={() => {
                        firebase.auth().currentUser.sendEmailVerification();
                        this.setState({ verificationClicked: true, verificationMessage: "Email sent. Please verify" });
                    }}
                >
                    Send Verification email
            </button></div>
                <h6>{this.state.verificationMessage}</h6><div>
                    <button className="veri-btn btn btn-outline-success mt-3" onClick={() => {
                        window.location.reload();
                    }}>Refresh after verifying!</button>
                    {/* <button onClick={() => { firebase.auth().signOut(); this.setState({ emailVerified: false, verificationMessage: "" }) }}>Sign out!</button> */}
                    {console.log(firebase.auth().currentUser)}
                </div>
            </Container>
        </div>);
    }
}

export default Verification;