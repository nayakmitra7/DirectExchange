import React, { Component } from 'react';
import firebase, { auth } from "../../js/helper/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import VerifyEmail from "./VerifyEmail"
import Navbar from '../Navbar/navbarLanding';
import { Redirect } from 'react-router';
// import { apiKey, authDomain } from "../../config";
import axios from "axios";
import { address } from "../../js/helper/constant";
import NewUserData from "./NewUserData";
import Verification from "./Verification";
import { toast } from 'react-toastify';
// firebase.initializeApp({
//     apiKey,
//     authDomain,
//     verificationMessage: ""
// })
// let newUser = false;
class Register extends Component {
    state = {
        isSignedIn: !!auth.currentUser,
        emailVerified: auth.currentUser ? auth.currentUser.emailVerified : false,
        verificationClicked: false,
        isNewUser: true,
        reDirectLanding: false,
        isUniqueNickname: false,
        submitMessage: ""
    }

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: false//async function (authResult, redirectUrl) {
            // console.log(authResult);
            // await this.setState({ newUser: authResult.additionalUserInfo.isNewUser }, () => { console.log(authResult.additionalUserInfo.isNewUser); });
            // newUser = authResult.additionalUserInfo.isNewUser;
            // return false;
            //}
        }
    }

    handleNewUserSubmit = async (data) => {
        await axios.post(`${address}/user`, data)
            .then(res => {
                console.log("In post user", res)
                if (res.status === 200) {
                    localStorage.setItem("id", res.data.id);
                    localStorage.setItem("emailId", res.data.emailId);
                    localStorage.setItem("nickname", res.data.nickname);
                    this.setState({ reDirectLanding: true });

                }
            })
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.code === 400) {
                    toast.error(err.response.data.error, { position: 'top-center', autoClose: false })
                    this.setState({ submitMessage: err.response.data.error });
                } else {
                    toast.error("Internal server error has occured", { position: 'top-center', autoClose: false })
                }
            })


    }

    newUserCheck = async (emailId) => {
        console.log("newusercheck")
        await axios.get(`${address}/user/${emailId}`)
            .then(res => {
                console.log(res)
                if (res.data.code === 404) {
                    this.setState({ isNewUser: true });
                } else if (res.status === 200) {
                    this.setState({ isNewUser: false, user: res.data });
                    let u = res.data;
                    localStorage.setItem("id", u.id);
                    localStorage.setItem("emailId", u.emailId);
                    localStorage.setItem("nickname", u.nickname);
                }
            }).catch(err => {
                if (err && err.response && err.response.data && err.response.data.code === 404) {
                    this.setState({ isNewUser: true });
                }
            })
    }
    componentDidMount = () => {
        // auth.signOut();
        // this.setState({isSignedIn:false, emailVerified: false, verificationMessage: "" })

        auth.onAuthStateChanged(user => {
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
        if (this.state.reDirectLanding || (this.state.emailVerified && !this.state.isNewUser)) {
            redirectVar = <Redirect to="/home" />
        }
        return (

            <div>
                {redirectVar}
                <Navbar></Navbar>
                {this.state.isSignedIn && !this.state.emailVerified ? (
                    <Verification

                    />
                ) : !this.state.isSignedIn ? (
                    <div align="center" className="show-grid form-row-style mt-5 mb-5 p-5">
                        <h3 className="m-5">Login/Register below!</h3>
                        <div className="mb-5">
                            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />
                        </div>
                    </div>
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