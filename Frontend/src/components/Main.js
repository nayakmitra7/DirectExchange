import React, { Component } from "react";
import Home from "./Home/home";
import LandingPage from "./LandingPage/landingPage";
import Register from "./Login/Register";
import PostOffer from "./PostOffer/postOffer";
import PrevailingRate from "./PrevailingRates/prevailingRate";
import BrowseOffer from "./BrowseOffer/BrowseOffer";
import AutoMatching from "./AutoMatching/autoMatching";
import MyOffer from "./MyOffer/MyOffer";
import CloseOffer from "./MyOffer/CloseOffer";
import InTransactionOffer from "./MyOffer/InTransactionOffer";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Create a Main Component
class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                    {/* <Switch> */}
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/home" component={Home} />
                    <Route path="/prevailingRates" component={PrevailingRate} />
                    <Route path="/auth" component={Register} />
                    <Route path="/postOffer" component={PostOffer} />
                    <Route path="/browseOffer" component={BrowseOffer} />
                    <Route path="/autoMatching" component={AutoMatching} />
                    <Route path="/myOffer/open" component={MyOffer} />
                    <Route path="/myOffer/close" component={CloseOffer} />
                    <Route path="/myOffer/intranscation" component={InTransactionOffer} />

                    {/* </Switch> */}
                </div>
            </Router>
        );
    }
}
//Export The Main Component
export default Main;
