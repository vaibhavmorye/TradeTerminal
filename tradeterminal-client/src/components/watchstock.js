import React, { Component } from 'react';

export default class WatchStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.watchStock = this.watchStock.bind(this);

  }

  watchStock() {
    //console.log("me called");
    // alert("symbol " + this.state.symbol);
    this.props.watchStockHandler(this.state.symbol);
    this.setState(() => { return { symbol: "" } });

  }

  handleChange(event) {
    //console.log("this.state"+ this.state.symbol);
    this.setState({ symbol: event.target.value });
  }

  render() {
    return (<div className="row">
      <p>Available stocks for demo: MCD, BA, BAC, LLY, GM, GE, UAL, WMT, AAL, JPM</p>
      <div className="input-group">
        <input type="text" className="form-control"
          placeholder="Comma separated list of stocks to watch..." value={this.state.symbol} onChange={this.handleChange} />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.watchStock}>
            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Watch
          </button>
        </span>
      </div>
    </div>);
  }

}