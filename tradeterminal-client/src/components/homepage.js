import React, { Component } from "react";
import WatchStock from "./watchstock";
import StockTable from "./stocktable";
import { onValueChange } from "../services/onValueChange";
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    };
    this.unwatchStock = this.unwatchStock.bind(this);
  }

  unwatchStock(stockName) {
    console.log(stockName);
    this.setState(() => {
      return {
        stocks: this.state.stocks.filter(stock => stock.symbol !== stockName)
      };
    });
  }

  watchStock(stockName) {}

  componentDidMount() {
    // console.log("i am mounted")
    // var socket = openSocket("http://localhost:4001");
    // socket.on("stock", stock => {
    //   console.log(stock)
    //   this.setState({ stocks: stock });
    // });
    onValueChange((stock) => {
      console.log(stock);
      this.setState(() => {
        return{stocks: stock}
      });
    });
  }

  render() {
    return (
      <div>
        <WatchStock watchStockHandler={this.watchStock} />
        <StockTable
          stocks={this.state.stocks}
          last={this.state.last}
          unwatchStockHandler={this.unwatchStock}
        />
        <div className="row">
          <div className="alert alert-warning" role="alert">
            All stock values are fake and changes are simulated. Do not trade
            based on the above data.
          </div>
        </div>
      </div>
    );
  }
}
