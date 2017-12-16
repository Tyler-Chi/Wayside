/* eslint-disable no-undef */

import React, { Component } from 'react';

class CustomersOrdersNewIndex extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log('inside index', this.props.filterTrips);
    this.props.filterTrips.map(trip => console.log(trip));
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
              <div>New trip distance: {trip.tripNewDistance} miles</div>
              <div>Price: ${trip.price.toFixed(2)}</div>

              <input
                type="submit"
                id="order-submit"
                value="Pick this driver"
                onClick={() => this.handleSubmit(trip)}>
              </input>
            </li>
          )
        }
      </ul>
    );
  }
}

export default CustomersOrdersNewIndex;


// <CustomersOrdersNewIndexItem
//   key={trip._id}
//   startLoc={this.props.startLoc}
//   endLoc={this.props.endLoc}
//   origin={trip.origin}
//   destination={trip.destination}
//   map={this.props.map}
//   service={this.props.service}
//   display={this.props.display}
//   />)

// this.props.filterTrips.map( trip =>
//   <CustomersOrdersNewIndexItem
//     key={trip._id}
//     startLoc={this.props.startLoc}
//     endLoc={this.props.endLoc}
//     origin={trip.origin}
//     destination={trip.destination}
//     />)

// <input
//   type="submit"
//   id="display-detail-search"
//   value="View Detail Map"
//   onClick={() => this.displayNewRoute(
//     trip.origin,
//     trip.destination,
//     this.state.startLoc,
//     this.state.endLoc,
//     this.directionsService,
//     this.directionsDisplay
//   )}>
// </input>
//
// <input
//   type="submit"
//   id="submit-order"
//   value="Confirm Selection"
//   onClick={() => this.handleSubmit(trip)}>
// </input>
