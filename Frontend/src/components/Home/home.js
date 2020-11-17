import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../Navbar/navbar';
import { toast } from 'react-toastify';
class Home extends Component {

    componentDidMount(){
        toast.success("Welcome!")
    }
    render() {
        return (
            <div>
            <Navbar></Navbar>
            <Container>
                <Row>
                    <Col></Col>
                </Row>

            </Container>
            </div>
        )
    }
}
//export Home Component
export default Home;