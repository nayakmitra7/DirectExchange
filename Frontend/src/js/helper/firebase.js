import firebase from "firebase";
import { apiKey, authDomain } from "../../config";

firebase.initializeApp({
    apiKey,
    authDomain,
    verificationMessage: ""
})

export const auth = firebase.auth();

export default firebase;