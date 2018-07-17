import React, { Component } from "react";
import StockRow from './stockrow';

export default class StockTable extends Component {
  render() {
    var items = [];
    var i = 0;
   // console.log(this.props.stocks);
    for (var stock of this.props.stocks) {
      console.log(stock);
      items.push(
        <StockRow
          key={i}
          stock={stock}
          last={stock.last}
          unwatchStockHandler={this.props.unwatchStockHandler}
        />
      );
      i++;
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
          <tbody>{items}</tbody>
        </table>
      </div>
    );
  }
}
