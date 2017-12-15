import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import './DriversTripItem.css';


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

        <h3>Packages</h3>


      </div>
    );
  }
}

export default DriversTripItem;
