import React, { Component } from "react";
import StockRow from './stockrow';

export default class StockTable extends Component {
  constructor(props) {
    super(props)
    this.items = [];
  }

  render() {
  //   this.items = [];
    //console.log(this.props.stocks);
    for (var symbol in this.props.stocks) {
      //console.log(symbol);
      var stock = this.props.stocks[symbol];
      this.items.push(
        <StockRow
          key={stock.key}
          stock={stock}
          last={stock.last}
          unwatchStockHandler={this.props.unwatchStockHandler}
        />
      );
    }
    return (
      <div className="row">
        <table className="table-hover">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Open</th>
              <th>Last</th>
              <th>Change</th>
              <th>High</th>
              <th>Low</th>
              <th>Unwatch</th>
            </tr>
          </thead>
          <tbody>{this.items}</tbody>
        </table>
      </div>
    );
  }
}