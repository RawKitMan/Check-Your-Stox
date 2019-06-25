import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Signup from '../../components/auth/Signup';
import StockNavbar from '../../components/StockNavbar';


class SignUp extends Component {

    render() {
        return (
            <Container> 
             <StockNavbar />               
                <Row className='mb-3'>
                    <Signup />
                </Row>
            </Container>
        )
    }
}

export default SignUp;
