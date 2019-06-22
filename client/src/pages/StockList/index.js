import React, { Component } from 'react';
import StockRow from '../../components/StockRow';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class StockList extends Component {

    state = {
        error: null,
        stockInfo: [],
        isLoaded: false,
        numStock: 0,
        totalWorth: 0,
        modalShow: false
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
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container>
                    <Row className = "mt-5 mb-5"/>
                    <Row className = "mt-5 mb-5"/>
                    <Row>
                        <table className="table table-striped border border-rounded border-primary">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Purchase</th>
                                </tr>
                            </thead>
                            <tbody>

                                {stockInfo.map(stock => (

                                    <StockRow
                                        name={stock.name}
                                        price={stock.price}
                                        handleOpen={this.handleOpen}
                                    />

                                ))}

                            </tbody>
                        </table>
                    </Row>

                    <Modal show={this.state.modalShow} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleClose}>Purchase</Button>
                            <Button variant="danger" onClick={this.handleClose}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>

                </Container >
            );
        }
    }

}

export default StockList;