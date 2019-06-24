import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import API from "../../utils/api";



class Portfolio extends Component {

    state = {
        error: null,
        isLoaded: false,
        stockInfo: [],
        purchaseList: [],
        showModal: false
    }

    componentDidMount() {


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

    render() {
        const { error, isLoaded, stockInfo, purchaseList } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container>
                    <Row className="mt-5 mb-5" />
                    <Row className="mt-5 mb-5" />
                    <Row>
                        <Table striped bordered hover responsive className="text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price Per Share at Purchase (USD)</th>
                                    <th scope="col">Current Price Per Share (USD)</th>
                                    <th scope="col">Price Difference (USD)</th>
                                    <th scope="col">Sell?</th>
                                </tr>
                            </thead>
                            <tbody>

                                {purchaseList.map((stock) => (

                                    <tr key={stock._id}>
                                        <td>{stock.name}</td>
                                        <td>${stock.purchasePrice}</td>
                                        <td>${stockInfo[stockInfo.map(element => {return element.name}).indexOf(stock.name)].price}</td>
                                        <td>${(parseFloat(stockInfo[stockInfo.map(element => {return element.name}).indexOf(stock.name)].price) - parseFloat(stock.purchasePrice).toFixed(2)).toFixed(2)}</td>
                                        <td><Button as="input" id={stock.name} type="button" defaultValue="Sell" onClick={(e) => { this.handleOpen(); this.handleSale(e, stock); }} /></td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </Row>
                </Container>
            )
        }
    }
}

export default Portfolio;