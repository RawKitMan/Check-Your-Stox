import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../../actions/authActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

class Signin extends Component {

    state = {
        email: '',
        password: '',
        errors: {}
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/")
        }
    }

    componentWillReceiveProps(props) {
        if (props.auth.isAuthenticated) {
            this.props.history.push("/")
        }
        if (props.errors) {
            this.setState({
                errors: props.errors
            })
        }
    }

    onChange = (event) => {
        this.setState(
            {
                [event.target.id]: event.target.value
            }
        );
    }

    onSubmit = (event) => {
        event.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(user);
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form noValidate onSubmit={this.onSubmit}>
                                <Form.Group >
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id='email'
                                        type='email'
                                        
                                    />
                                    {errors.email || errors.emailnotfound ?
                                        <Alert variant='danger'>
                                            {errors.email}
                                            {errors.emailnotfound}
                                        </Alert>
                                        : ''
                                    }
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id='password'
                                        type='password'
                                    />
                                    {errors.password || errors.passwordincorrect ?
                                        <Alert variant='danger'>
                                            {errors.password}
                                            {errors.passwordincorrect}
                                        </Alert>
                                        : ''
                                    }
                                </Form.Group>
                                <Button type='submit' className='float-left'>Login</Button>
                            </Form>
                        </Col>

                    </Row>
                </Container>
            </div>
        );
    }
}

Signin.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default withRouter(
    connect(
        mapStateToProps,
        { loginUser }
    )(Signin)
);