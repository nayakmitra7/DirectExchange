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
import CounterReceived from "./MyOffer/CounterReceived";
import CounterMade from "./MyOffer/CounterMade";
import SendMessage from "./SendMessage/SendMessgae";
import OfferHistory from "./OtherOffer/OfferHistory";
import OfferAbortedHistory from "./OtherOffer/OfferAbortedHistroy";

import Account from "./Account/Account";
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
          <Route path="/myOffer/counterreceived" component={CounterReceived} />
          <Route path="/myOffer/countermade" component={CounterMade} />
          <Route path="/sendMessage" component={SendMessage} />
          <Route path="/offer/history/:id" component={OfferHistory} />
          <Route
            path="/offer/abort/history/:id"
            component={OfferAbortedHistory}
          />

          <Route path="/accounts/:userId" component={Account} />
          {/* </Switch> */}
        </div>
      </Router>
    );
  }
}
//Export The Main Component
export default Main;
