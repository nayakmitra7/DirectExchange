import React, { Component } from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import VerifyEmail from "./VerifyEmail"
import Navbar from '../Navbar/navbarLanding';

firebase.initializeApp({
    apiKey: "AIzaSyC2C8BbrJZNiEJGjwba48SFNf0fLy5syaA",
    authDomain: "cmpe275-12.firebaseapp.com",
    verificationMessage: ""
})

class Register extends Component {
    state = { isSignedIn: false, emailVerified: false }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }
    componentDidMount = () => {

        firebase.auth().onAuthStateChanged(user => { this.setState({ isSignedIn: !!user, emailVerified: user ? user.emailVerified : false }) })

    }

    updateVerificationStatus = (status) => {
        this.setState({ emailVerified: status });
    }
    render() {
        return (
        
        <div>
            <Navbar></Navbar>
            {this.state.isSignedIn && !this.state.emailVerified ? (
                <div>
                    <button
                        onClick={() => {
                            firebase.auth().currentUser.sendEmailVerification();
                            this.setState({ verificationMessage: "Email sent. Please verify" });
                        }}
                    >
                        Send Verification email
                    </button>
                    <button onClick={() => { firebase.auth().signOut(); this.setState({ emailVerified: false }) }}>Sign out!</button>
                    {console.log(firebase.auth().currentUser)}
                    {this.state.verificationMessage}
                </div>
                // <span>
                //     <div>Sign in</div>
                //     <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                //     {console.log(firebase.auth().currentUser)}
                // </span>

            ) : this.state.isSignedIn && this.state.emailVerified ? (
                <span>
                    <div>Signed in!</div>
                    <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                    {console.log(firebase.auth().currentUser)}
                </span>
            ) : (
                        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                    )
            }
        </div>);
    }
}

export default Register;