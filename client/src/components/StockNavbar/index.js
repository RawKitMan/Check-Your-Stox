import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


class StockNavbar extends Component {

    render() {

        return (

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/portfolio">Portfolio</Nav.Link>
                    <Nav.Link href="/stocklist">Stock List</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="/">CJ Vaughn</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

        );
    }
};

export default StockNavbar;