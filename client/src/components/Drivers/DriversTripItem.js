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

        <div className="trip-date">
          <div className="column trip-departure-div">
            <h4>DEPARTURE DATE</h4>
            <h3 className="trip-departure">  {tripStartDate}</h3>
          </div>

          <div className="column trip-arrival-div">
            <h4>ARRIVAL DATE:</h4>
            <h3 className="trip-arrival">  {tripEndDate}</h3>
          </div>
        </div>


        <div className="trip-item-bottom">
          <div className="column">
            <h4>STARTING LOCATION</h4>
            <h3 className="trip-start">{trip.origin}</h3>
          </div>

          <div className="column">
            <h4>DESTINATION</h4>
            <h3 className="trip-end"> {trip.destination}</h3>
          </div>

          <div className="trip-etc">
            <div className="column">
              <h4>PENDING REQUESTS</h4>
              <h3 className="trip-requests">  </h3>
            </div>

            <div className="column">
              <h4>PACKAGES</h4>
              <h3 className="trip-packages">{trip.orders.length}</h3>
            </div>

            <button className="trip-button">See Trip Information</button>

        </div>
        </div>

      </div>
    );
  }
}

export default DriversTripItem;
