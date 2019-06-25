import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Signin from '../../components/auth/Signin';
import StockNavBar from '../../components/StockNavbar';


const Login = props => {
    
        return (
            <Container>
                <StockNavBar />
                <Row>
                    <Signin />
                </Row>
                <Row>
                    <Button href="/signup">Create Account</Button>
                </Row>

            </Container>
        )

    
}

export default Login;