import React, { Component } from 'react';
import Home from './Home/home';
import LandingPage from './LandingPage/landingPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Create a Main Component
class Main extends Component {
    render() {
        return (
            <Router>
               
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/home" component={Home} />
                </Switch>
            </Router>


        )
    }
}
//Export The Main Component
export default Main;