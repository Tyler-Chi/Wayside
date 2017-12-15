import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class DriversTripItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let trip = this.props.trip;
    let tripStartDate = this.props.trip.tripStartDate.toString().slice(0, 10);
    let tripEndDate = trip.tripEndDate.toString().slice(0, 10);

    return(
      <div className="trip-item">
        <h3>{trip.origin}</h3>
        <h3>{trip.destination}</h3>
        <h3>{tripStartDate}</h3>
        <h3>{tripEndDate}</h3>

        <div className="down">
          <div className="drop-content">
            <h4>Not Picked Up</h4>
            <h4>On Route</h4>
            <h4>Delievered</h4>
          </div>
          <button className="drop-button">
            Package Status
          </button>
        </div>

      </div>
    );
  }
}

export default DriversTripItem;
