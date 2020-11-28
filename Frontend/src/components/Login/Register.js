import React, { Component } from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import VerifyEmail from "./VerifyEmail"
import Navbar from '../Navbar/navbarLanding';
import { Redirect } from 'react-router';
import { apiKey, authDomain } from "../../config";
import axios from "axios";
import { address } from "../../js/helper/constant"
import NewUserData from "./NewUserData"

firebase.initializeApp({
    apiKey,
    authDomain,
    verificationMessage: ""
})
let newUser = false;
class Register extends Component {
    state = {
        isSignedIn: !!firebase.auth().currentUser,
        emailVerified: firebase.auth().currentUser ? firebase.auth().currentUser.emailVerified : false,
        verificationClicked: false,
        isNewUser: true,
        reDirectLanding: false,
        isUniqueNickname: false
    }

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: async function (authResult, redirectUrl) {
                console.log(authResult.additionalUserInfo.isNewUser);
                // await this.setState({ newUser: authResult.additionalUserInfo.isNewUser }, () => { console.log(authResult.additionalUserInfo.isNewUser); });
                newUser = authResult.additionalUserInfo.isNewUser;
                return false;
            }
        }
    }

    handleNewUserSubmit = async (data) => {
        await axios.post(`${address}/user`, data)
            .then(res => {
                console.log("In post user")
                if (res.data.code === 400)
                    this.setState({ submitMessage: res.data.error });
                else if (res.data.code === 200) {
                    this.setState({ reDirectLanding: true });
                    localStorage.setItem("id", res.data.id);
                    localStorage.setItem("emailId", res.data.emailId);
                    localStorage.setItem("nickname", res.data.nickname);
                }
            })


    }

    newUserCheck = async (emailId) => {
        await axios.get(`${address}/user/${emailId}`)
            .then(res => {
                if (res.data.code === 404) {
                    this.setState({ isNewUser: true });
                } else if (res.data.code === 200) {
                    this.setState({ isNewUser: false });
                }
            })
    }
    componentDidMount = () => {
        // firebase.auth().signOut();
        // this.setState({isSignedIn:false, emailVerified: false, verificationMessage: "" })

        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                this.setState({ user })
                this.newUserCheck(user.email);

            }
            this.setState({
                isSignedIn: !!user,
                emailVerified: user ? user.emailVerified : false
            })

        })

    }

    render() {
        let redirectVar = null;
        if (this.state.reDirectLanding) {
            redirectVar = <Redirect to="/home" />
        }
        return (

            <div>
                {redirectVar}
                <Navbar></Navbar>
                {this.state.isSignedIn && !this.state.emailVerified ? (
                    <div>
                        Please verify your email. Check you inbox!
                        <button
                            onClick={() => {
                                firebase.auth().currentUser.sendEmailVerification();
                                this.setState({ verificationClicked: true, verificationMessage: "Email sent. Please verify" });
                            }}
                        >
                            Send Verification email
                        </button>
                        <button onClick={() => {
                            window.location.reload();
                        }}>Refresh after verifying!</button>
                        <button onClick={() => { firebase.auth().signOut(); this.setState({ emailVerified: false, verificationMessage: "" }) }}>Sign out!</button>
                        {console.log(firebase.auth().currentUser)}
                        {this.state.verificationMessage}
                    </div>
                ) : !this.state.isSignedIn ? (

                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                ) : ""}
                { this.state.emailVerified && this.state.isNewUser ? (
                    <NewUserData
                        user={this.state.user}
                        handleNewUserSubmit={this.handleNewUserSubmit}
                        submitMessage={this.state.submitMessage}
                    />

                ) : ""
                }
            </div>);
    }
}

export default Register;