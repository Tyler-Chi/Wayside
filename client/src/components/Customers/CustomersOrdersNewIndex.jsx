
import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import './CustomersOrdersNew.css';
import './CustomersOrdersNewItem.css';

const RATE = 0.25;


class CustomersOrdersNewIndex extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayNewRoute = this.displayNewRoute.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.state = {
      displayMap: false
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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
    this.props.history.push('/customers/orders/upcoming');
  }

  handleDisplay(trip) {
    this.displayNewRoute(
      trip.origin,
      trip.destination,
      this.props.startLoc,
      this.props.endLoc,
      this.props.service,
      this.props.display
    );
    // window.scrollTo(0, 500);
  }

  render() {
    if (!this.props.filterTrips) {
      return (
        <div></div>
      );
    }
    if (this.props.displayMessage === true && this.props.filterTrips.length === 0) {
      return (
        <div className="item-holder">
          <h2>Sorry, no matched results!</h2>
          <h4>We only match trips that are within 100 miles off from driver's original trip, as well as ending before your request delivery date.</h4>
          <h4>Maybe adjust your date or locations?</h4>
        </div>
      );
    }

    var filterTrips = this.props.filterTrips.sort((x,y) => x.price - y.price );

    return (
      <div className="customer-orders-new-all">
        <ul className="customer-order-list">
          {
            filterTrips.map( trip =>
              <li key={trip._id} className="order-new-item">
                <div className="order-new-date">
                  <div className="column order-new-deliverby">
                    <h4>DELIVER BY</h4>
                    <h3 className="order-new-deliverby">
                      {trip.tripEndDate.split('T')[0]}
                    </h3>
                  </div>
                </div>


                <div className="order-new-item-bottom">
                  <div className="column">
                    <h4>NEW TRIP DISTANCE</h4>
                    <h3 className="order-new-endLoc">
                      {Math.ceil(trip.tripNewDistance)} miles
                    </h3>
                  </div>

                  <div className="column">
                    <h4>ORIGINAL DISTANCE</h4>
                    <h3 className="order-new-startLoc">
                      {trip.tripDistance} miles
                    </h3>
                  </div>

                  <div className="column">
                    <h4 className="request">DETOUR</h4>
                    <h3 className="order-new-request request">
                      {Math.ceil(trip.tripNewDistance) - trip.tripDistance} miles
                    </h3>
                  </div>

                  <div className="column price">
                    <h4 className="price">PRICE (${RATE}/mile)</h4>
                    <h3 className="order-new-price price">
                      ${trip.price.toFixed(2)}
                    </h3>
                  </div>


                  <div className="driver-new-row row">
                    <div className="driver-new-info">
                      <img className="driver-img" alt="user-img" src={trip.userObject.imageUrl}/>
                      <div className="column order-driver-col">
                        <h4>DRIVER</h4>
                        <h3 className="order-driver">
                          {trip.userObject.name}
                        </h3>
                      </div>

                    </div>
                  </div>
                  <div className="new-driver-rating column">
                    <h4>DRIVER RATING</h4>
                    <div className="new-driver-rating">
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="column">
                    <input
                      type="submit"
                      id="order-view-map"
                      value="View map"
                      className="trip-button"
                      onClick={() => this.handleDisplay(trip)}>
                    </input>


                    <input
                      type="submit"
                      id="order-submit"
                      value="Pick this driver"
                      className="trip-button new-order-bottom-button"
                      onClick={() => this.handleSubmit(trip)}>
                    </input>

                  </div>


                </div>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default connect(null, actions)(CustomersOrdersNewIndex);
