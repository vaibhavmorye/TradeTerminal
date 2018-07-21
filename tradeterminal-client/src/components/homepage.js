import React, { Component } from "react";
import WatchStock from "./watchstock";
import StockTable from "./stocktable";
import * as changes from "../services/onValueChange";
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    };
    this.unwatchStock = this.unwatchStock.bind(this);
    this.watchStock= this.watchStock.bind(this);
  }

  unwatchStock(stockName) {
    console.log(stockName);
    this.setState(() => {
      return {
        stocks: this.state.stocks.filter(stock => stock.symbol !== stockName)
      };
    });

    console.log(this.state.stocks);
    changes.unwatch(stockName);
  }

  watchStock(stockName) {changes.watch(stockName);}

  componentDidMount() {
    // console.log("i am mounted")
    // var socket = openSocket("http://localhost:4001");
    // socket.on("stock", stock => {
    //   console.log(stock)
    //   this.setState({ stocks: stock });
    // });
    // when i will add database to app i will set this value from server as this value should be persist
    //session to session
    
    changes.watch([
      "HEG",
      "HUL",
      "GCRB",
      "UAL",
      "IDA",
      "IDFC",
      "ECH",
      "TCS",
      "GBP",
      "NIIT"
    ]);
    changes.onValueChange(stock => {
      // console.log("onValueChange");
      var tempstocks = this.state.stocks;
      tempstocks[stock.symbol] = stock;
     // stocks[stock.symbol] = stock;
      //console.log(stocks);
      this.setState(() => {
        return { stocks: tempstocks };
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
