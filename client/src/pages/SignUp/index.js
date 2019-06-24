import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Signup from '../../components/auth/Signup';


class SignUp extends Component {

    render() {
        return (
            <Container>                
                <Row className='mb-3'>
                    <Signup />
                </Row>
            </Container>
        )
    }
}

export default SignUp;
