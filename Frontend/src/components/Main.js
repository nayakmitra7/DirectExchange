import React, { Component } from 'react';
import Home from './Home/home';
import LandingPage from './LandingPage/landingPage';
import Register from "./Login/Register"
import PostOffer from './PostOffer/postOffer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Create a Main Component
class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                    {/* <Switch> */}
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/home" component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/postOffer" component={PostOffer} />
                    {/* </Switch> */}
                </div>
            </Router>


        )
    }
}
//Export The Main Component
export default Main;