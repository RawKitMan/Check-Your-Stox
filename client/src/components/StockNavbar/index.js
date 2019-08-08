import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const StockNavbar = props => {


    return (
        <div className = "container-fluid p-0 bg-dark">
            <Navbar bg="dark" variant="dark" expand="lg" >
                <Navbar.Brand>Welcome!</Navbar.Brand>

                <Navbar.Collapse className="justify-content-end">
                    {props.username ?
                        <Nav className="mr-auto">
                            <Nav.Link href="/portfolio">Portfolio</Nav.Link>
                            <Nav.Link href="/stocklist">Stock List</Nav.Link>
                            <Button onClick={props.signout}>Sign Off</Button>
                        </Nav>

                        : <div>{window.location.pathname === '/signin' ?
                            <Link to='/signup'>
                                <Button>
                                    Sign Up
                        </Button>
                            </Link>
                            : <Link to='/'>
                                <Button>
                                    Sign In
                        </Button>
                            </Link>
                        }</div>
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    );

};

export default StockNavbar;