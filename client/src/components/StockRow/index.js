import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


class StockRow extends Component {

    render() {
        return (
            <tr key={this.props.name}>
                <td>{this.props.name}</td>
                <td>${this.props.price}</td>
                <td><Button onClick = {this.props.handleOpen} as="input" type="button" value="Buy" /></td>
            </tr>
        )
    }
}

export default StockRow