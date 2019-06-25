import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from "../../actions/authActions";
import StockNavBar from '../../components/StockNavbar';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import API from "../../utils/api";

class Portfolio extends Component {

    onSignoutClick = (event) => {
        event.preventDefault();
        this.props.logoutUser();
    }

    state = {
        error: null,
        isLoaded: false,
        stockInfo: [],
        purchaseList: [],
        showSellModal: false,
        sellStockId: '',
        buyStockId: '',
        showBuyModal: false,
        numStockPurchase: '',
        buyPrice: '',
    }

    componentDidMount() {

        this.interval = setInterval(() => {
            window.location.reload()
        }, 600000)

        fetch('https://api.worldtradingdata.com/api/v1/stock_search?stock_exchange=NASDAQ&api_token=AbfOZS7KraxAILz0rqzgIfOJHbTIxxEX8upEqHnj1CeCphNBXrm60jcDug8W')
            .then(res => res.json())
            .then(
                //Get the data from the API and store it in the state
                (result) => {
                    let stockData = result.data;
                    API.getPurchases(function (err, docs) { })
                        .then(res => {
                            console.log(res)

                            this.setState({
                                isLoaded: true,
                                stockInfo: stockData,
                                purchaseList: res.data
                            })

                        });
                },
                //Any error messages will be stored in the state
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleSellOpen = () => {
        this.setState({
            showSellModal: true
        })
    }

    handleSellClose = () => {
        this.setState({
            showSellModal: false
        })
    }

    handleBuyOpen = () => {
        this.setState({
            showBuyModal: true
        })
    }

    handleBuyClose = () => {
        this.setState({
            showBuyModal: false
        })
    }

    handleSale = (event, sellId) => {
        this.setState({
            sellStockId: sellId
        });
    }

    handleBuy = (event, buyId, purchasePrice) => {

        this.setState({
            buyStockId: buyId,
            buyPrice: purchasePrice
        })
    }

    handleChange = (event) => {
        this.setState({
            numStockPurchase: event.target.value
        })
    }

    sellStock = (stockId) => {

        API.sellStock(stockId)
            .then(window.location.reload())
            .catch(err => console.log(err))

    }

    buyMoreShares = (stockId, numStockPurchase) => {

        let purchaseObject = this.state.purchaseList[this.state.purchaseList.map(element => { return element._id }).indexOf(stockId)];

        let totalShares = purchaseObject.numShares + parseInt(numStockPurchase);

        API.buyMoreShares(stockId, totalShares)
            .then(window.location.reload())
            .catch(err => console.log(err))


    }

    render() {
        const { error, isLoaded, stockInfo, purchaseList } = this.state;
        const { user } = this.props.auth

        console.log(user);

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (

                <Container>
                    <StockNavBar
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
                                    <th scope="col"># of Shares</th>
                                    <th scope="col">Price Per Share at Purchase (USD)</th>
                                    <th scope="col">Current Price Per Share (USD)</th>
                                    <th scope="col">Price Difference (USD)</th>
                                    <th scope="col">Sell?</th>
                                    <th scope="col">Buy More?</th>
                                </tr>
                            </thead>
                            <tbody>

                                {purchaseList.map((stock) => (

                                    <tr key={stock._id}>
                                        <td>{stock.name}</td>
                                        <td>{stock.numShares}</td>
                                        <td>${stock.purchasePrice}</td>
                                        <td>${stockInfo[stockInfo.map(element => { return element.name }).indexOf(stock.name)].price}</td>
                                        <td>${(parseFloat(stockInfo[stockInfo.map(element => { return element.name }).indexOf(stock.name)].price) - parseFloat(stock.purchasePrice).toFixed(2)).toFixed(2)}</td>

                                        <td><Button as="input" id={stock.name} type="button" defaultValue="Sell" onClick={(e) => { this.handleSellOpen(); this.handleSale(e, stock._id, stockInfo[stockInfo.map(element => { return element.name }).indexOf(stock.name)].price); }} /></td>

                                        <td><Button as="input" id={stock.name} type="button" defaultValue="Buy" onClick={(e) => { this.handleBuyOpen(); this.handleBuy(e, stock._id, stockInfo[stockInfo.map(element => { return element.name }).indexOf(stock.name)].price); }}></Button></td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </Row>

                    <Modal show={this.state.showSellModal} onHide={this.handleSellClose}>
                        <Modal.Body>
                            <p>Are you sure you want to sell these shares??</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => { this.handleSellClose(); this.sellStock(this.state.sellStockId) }}>Sell</Button>
                            <Button variant="danger" onClick={this.handleSellClose}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showBuyModal} onHide={this.handleBuyClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>How many would you like to purchase?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <textarea value={this.state.numStockPurchase} onChange={this.handleChange} />
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => { this.handleBuyClose(); this.buyMoreShares(this.state.buyStockId, this.state.numStockPurchase) }}>Purchase</Button>
                            <Button variant="danger" onClick={this.handleBuyClose}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            )
        }
    }
}

Portfolio.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Portfolio);