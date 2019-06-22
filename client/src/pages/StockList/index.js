import React, { Component } from 'react';
import StockRow from '../../components/StockRow';
import Container from 'react-bootstrap/Container';

class StockList extends Component {

    state = {
        error: null,
        stockInfo: [],
        isLoaded: false
    }

    componentDidMount() {

        fetch('https://api.worldtradingdata.com/api/v1/stock_search?stock_exchange=NASDAQ&api_token=AbfOZS7KraxAILz0rqzgIfOJHbTIxxEX8upEqHnj1CeCphNBXrm60jcDug8W')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        stockInfo: result.data
                    });

                    console.log(result.data);

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {

        const { error, isLoaded, stockInfo } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container>
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
                                />

                            ))}

                        </tbody>
                    </table>
                </Container>
            );
        }
    }

}

export default StockList;