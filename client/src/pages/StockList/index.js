
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from "../../actions/authActions";
import StockNavbar from '../../components/StockNavbar';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import API from "../../utils/api";


class StockList extends Component {

    state = {
        error: null,
        stockInfo: [],
        isLoaded: false,
        numStock: '',
        modalShow: false,
        purchaseName: '',
        purchasePrice: ''
    }

    //This method explains what the page will do when the Stock List page loads
    componentDidMount() {

        fetch('https://api.worldtradingdata.com/api/v1/stock_search?stock_exchange=NASDAQ&api_token=AbfOZS7KraxAILz0rqzgIfOJHbTIxxEX8upEqHnj1CeCphNBXrm60jcDug8W')
            .then(res => res.json())
            .then(
                //Get the data from the API and store it in the state
                (result) => {
                    this.setState({
                        isLoaded: true,
                        stockInfo: result.data
                    });
                },
                //Any error messages will be stored in the state
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    //Method to close the purchase modal
    handleClose = () => {
        this.setState({
            modalShow: false
        })
    }

    //Method to open the purchase modal
    handleOpen = () => {
        this.setState({
            modalShow: true
        })
    }

    handlePurchase = (event, stock) => {
        console.log(stock);

        this.setState({
            purchaseName: stock.name,
            purchasePrice: stock.price
        });
    }

    saveStocks = (purchaseName, numStock, userId) => {

        let totalWorth = (parseInt(numStock) * parseFloat(this.state.purchasePrice)).toFixed(2);

        API.saveStocks(purchaseName, this.state.purchasePrice, totalWorth, numStock, userId)
            .then(res => {
                this.setState({
                    purchaseName: '',
                    purchasePrice: '',
                    numStock: '',
                    totalWorth: 0
                })

            })
            .catch(err => console.log(err));

    }

    handleChange = (event) => {
        this.setState({
            numStock: event.target.value
        })
    }


    /*This page will render one of three displays: 
        1) The error message if the API sends an error
        2) A loading message while the app grabs all of the API data
        3) The displayed data in a table format
    
    From there, the user can view the available stocks for purchase can try tobuy the stocks. Upon clicking the 
    associated Buy button for a stock, the user will be able to enter how many stocks they wish to purchase in a form. If
    the user has enough money in their 'wallet', the purchase will go through. Otherwise they will get an error message saying they have
    insufficient funds. If a purchase goes through, the purchase will be stored in the database under the user's profile and the amount
    used to purchase the stocks will be deducted from their wallet.*/

    render() {

        const { error, isLoaded, stockInfo } = this.state;
        const { user } = this.props.auth;

        console.log(this.props);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container>
                    <StockNavbar
                        username={user.name}
                        signout={this.onSignoutClick}
                    />
                    <Row className="mt-5 mb-5" />
                    <Row className="mt-5 mb-5" />
                    <Row>
                        <Table striped bordered hover responsive className="text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price per stock (USD)</th>
                                    <th scope="col">Purchase</th>
                                </tr>
                            </thead>
                            <tbody>

                                {stockInfo.map(stock => (

                                    <tr key={stock.name}>
                                        <td>{stock.name}</td>
                                        <td>${stock.price}</td>
                                        <td><Button as="input" id={stock.name} type="button" defaultValue="Buy" onClick={(e) => { this.handleOpen(); this.handlePurchase(e, stock); }} /></td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </Row>

                    <Modal show={this.state.modalShow} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>How many would you like to purchase?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <textarea value={this.state.numStock} onChange={this.handleChange} />
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => { this.handleClose(); this.saveStocks(this.state.purchaseName, this.state.numStock, user.name) }}>Purchase</Button>
                            <Button variant="danger" onClick={this.handleClose}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            )
        }
    }
}

StockList.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(StockList);