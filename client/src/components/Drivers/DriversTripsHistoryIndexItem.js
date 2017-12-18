import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class DriversTripsHistoryIndexItem extends Component {
  render() {
    const { trip } = this.props;
    return (
      <div className="dthii-div">
        <h1> HELLO WORLD </h1>
      </div>
    );
  }
}

export default DriversTripsHistoryIndexItem;
