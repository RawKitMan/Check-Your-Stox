import React, {Component} from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Signin from '../../components/auth/Signin';


class Login extends Component {

    render(){
        return(
            <Container>
                <Row>
                    <Signin />
                </Row>
            </Container>
        )
    }
}

export default Login;