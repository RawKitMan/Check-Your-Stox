import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from '../../../actions/authActions';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

class Signup extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/portfolio");
        }
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = (event) => {
        console.log(event.target.value);
        this.setState(
            {
                [event.target.id]: event.target.value
            }
        )
    }

    onSubmit = (event) => {
        event.preventDefault();

        let newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        console.log(newUser);

        this.props.registerUser(newUser, this.props.history);
    }


    render() {
        const { errors } = this.state;
        return (
            <Container fluid>
                <Row className='my-4'>

                    <Col xs={12} md={6} className="form">
                        <Form noValidate onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"

                                />
                                {errors.name ? (
                                    <Alert variant="danger">{errors.name}</Alert>
                                ) : (
                                        ""
                                    )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                />
                                {errors.email ? (
                                    <Alert variant="danger">{errors.email}</Alert>
                                ) : (
                                        ""
                                    )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"

                                />
                                {errors.password ? (
                                    <Alert variant="danger">{errors.password}</Alert>
                                ) : (
                                        ""
                                    )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm password:</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"

                                />
                                {errors.password2 ? (
                                    <Alert variant="danger">{errors.password2}</Alert>
                                ) : (
                                        ""
                                    )}
                            </Form.Group>
                            <Button type='submit' className='float-left'>Create Account</Button>

                        </Form>
                    </Col>

                </Row>
            </Container>
        );
    }
}

Signup.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Signup));