import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../Navbar/navbar';
class Home extends Component {

    componentDidMount() {
        if (localStorage.getItem("nickname") == null)
            window.location.reload()
    }
    render() {
        return (
            <div>
                <Navbar></Navbar>
                    <Row>
                        <Col>
                            <marquee bgcolor="#66CD00" height="50" scrollamount="12"><div style={{marginTop:'0.5%',fontSize:'25px'}}>Welcome to Direct Exchange!</div></marquee>
                        </Col>
                    </Row>
            </div>
        )
    }
}
//export Home Component
export default Home;