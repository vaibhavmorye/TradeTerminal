import React, { Component } from "react";

export default class StockRow extends Component {
  constructor(props) {
    super(props);
    this.unwatch = this.unwatch.bind(this);
  }

  unwatch() {
    this.props.unwatchStockHandler(this.props.stock.symbol);
  }

  render() {
    var lastClass = "";
    var changeClass = "change-positive";
    var iconClass = "glyphicon glyphicon-triangle-top";

    if (this.props.stock === this.props.last) {
      lastClass =
        this.props.stock.change < 0 ? "last-negative" : "last-positive";
    }

    if (this.props.stock.change < 0) {
      changeClass = "change-negative";
      iconClass = "glyphicon glyphicon-triangle-bottom";
    }
    return (
      <tr>
        <td>{this.props.stock.symbol}</td>
        <td>{this.props.stock.open}</td>
        <td className={lastClass}>{this.props.stock.last}</td>
        <td className={changeClass}>
          {this.props.stock.change}{" "}
          <span className={iconClass} aria-hidden="true" />
        </td>
        <td>{this.props.stock.high}</td>
        <td>{this.props.stock.low}</td>
        <td>
          <button
            type="button"
            className="btn btn-default btn-sm"
            onClick={this.unwatch}
          >
            <span
              className="glyphicon glyphicon-eye-close"
              aria-hidden="true"
            />
          </button>
        </td>
      </tr>
    );
  }
}
