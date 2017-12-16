
import React, { Component } from 'react';

const RATE = 0.25;


class CustomersOrdersNewIndex extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayNewRoute = this.displayNewRoute.bind(this);
  }

  //this one will handle displaying the new map, taking customer start and end location as waypoints
  displayNewRoute(origin, destination, startLoc, endLoc, service, display) {
    service.route(
      {
        origin,
        destination,
        waypoints: [{location: startLoc}, {location: endLoc}],
        travelMode: "DRIVING",
        avoidTolls: true
      },
      (response, status) => {
        if (status === "OK") {
          display.setDirections(response);
        } else {
          alert("COULD NOT DISPLAY DIRECTIONS DUE TO: " + status);
        }
      }
    );
  }

  handleSubmit(trip) {
    this.props.submitOrder({
      accepted: false,
      deliveredBy: trip.tripEndDate,
      startLoc: this.props.startLoc,
      endLoc: this.props.endLoc,
      deliveredStatus: false,
      requestPending: true,
      rating: 0,
      price: trip.price.toFixed(2),
      comments: [],
      _driverId: trip._user,
      _tripId: trip._id,
    });
  }

  render() {
    if (!this.props.filterTrips) {
      return (
        <div></div>
      );
    }
    if (this.props.displayMessage === true && this.props.filterTrips.length === 0) {
      return (
        <h3>Sorry! Couldn't find any matching trip for this route. Maybe adjust your date or locations?</h3>
      );
    }

    return (
      <ul>
        {
          this.props.filterTrips.map( trip =>
            <li key={trip._id}>
              <h3>Matched Drivers</h3>
              <div>Driver Name: {trip.userObject.name}</div>
              <div>Driver Rating: </div>
              <div>Delivered By: {trip.tripEndDate.split('T')[0]}</div>
              <div>Original trip distance: {trip.tripDistance} miles</div>
              <div>New trip distance: {Math.ceil(trip.tripNewDistance)} miles</div>
              <div>Differences: {Math.ceil(trip.tripNewDistance) - trip.tripDistance} miles</div>
              <div>Price (${RATE}/mile): ${trip.price.toFixed(2)}</div>

              <input
                type="submit"
                id="order-submit"
                value="Pick this driver"
                onClick={() => this.handleSubmit(trip)}>
              </input>

              <input
                type="submit"
                id="order-view-map"
                value="View map"
                onClick={() => this.displayNewRoute(
                    trip.origin,
                    trip.destination,
                    this.props.startLoc,
                    this.props.endLoc,
                    this.props.service,
                    this.props.display
                  )}>
              </input>
            </li>
          )
        }
      </ul>
    );
  }
}

export default CustomersOrdersNewIndex;
