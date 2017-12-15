/* eslint-disable no-undef */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

// const kmToMile = 0.621371 / 1000;
const rate = 0.25;
const mapOptions = {
  zoom: 3,
  center: { lat: 40.612969, lng: -96.455751 } //center of US
};

class CustomersOrdersNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDistance: 0,
      deliveredBy: "",
      startLoc: "",
      endLoc: "",
      latS: 0,
      lngS: 0,
      latE: 0,
      lngE: 0
    };
    this.today = new Date().toJSON().split("T")[0];

    this.handleSearch = this.handleSearch.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);
    this.checkAndCalculate = this.checkAndCalculate.bind(this);
    this.sortTrips = this.sortTrips.bind(this);
    this.getGeo = this.getGeo.bind(this);
    this.displayNewRoute = this.displayNewRoute.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllUpcoming();
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
    this.directionsService = new google.maps.DirectionsService();
    this.geocoder = new google.maps.Geocoder();

    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map
    });
    window.scrollTo(0, 0);
  }

  geocodeAddress(geocoder, map, address, type) {
    geocoder.geocode({ address: address }, async (result, status) => {
      if (status !== "OK") {
        alert("INVALID ADDRESS DUE TO: " + status);
      } else {

        if (type === "start") {
          this.setState({
            latS: await result[0].geometry.location.lat(),
            lngS: await result[0].geometry.location.lng()
          });
        } else if (type === "end") {
          this.setState({
            latE: await result[0].geometry.location.lat(),
            lngE: await result[0].geometry.location.lng()
          });
        }
      }
    });
  }

  sortTrips() {
    let trips = this.props.entities.trips;
    let filterTrips = [];

    Object.values(trips).forEach(trip => {
  ;
      this.newDistance = this.checkAndCalculate(trip.latO, trip.lngO, trip.latD, trip.lngD);
      let oldDistance = trip.tripDistance;
      this.difference = this.newDistance - oldDistance;

      let tripPrice = (this.difference * rate).toFixed(2);
      if ( (this.difference <= 50) && (this.state.deliveredBy >= trip.tripEndDate) ) {
        this.props.updateTrip(trip._id, {price: tripPrice});
        filterTrips.push(trip);
      }
    });
    this.searchTrips = filterTrips;
    return filterTrips;
  }

  populateSearch() {
    let filterTrips = this.searchTrips;
    console.log('filter', filterTrips);
    if (!filterTrips) {
      return (<div></div>);
    }
    else
    { filterTrips.forEach(trip => {
      console.log('trip', trip);
      return (
        <li>
          <h2>Matched Drivers</h2>
          <div>Driver Name: {trip.userObject.name}</div>
          <div>Driver Rating: </div>
          <div>Delivered By: {trip.tripEndDate}</div>
          <div>Original trip distance: {trip.tripDistance} miles</div>
          <div>New trip distance: {this.newDistance} miles</div>
          <div>Price: ${trip.price}</div>
          <input type="submit" id="display-detail-search"
            value="View Detail Map"
            onClick={() => this.displayNewRoute(
              trip.origin,
              trip.destination,
              this.state.startLoc,
              this.state.endLoc,
              this.directionsService,
              this.directionsDisplay
            )}></input>
          <input type="submit" id="submit-order"
            value="Confirm Selection"
            onClick={this.handleSubmit}></input>
        </li>
      )
      });
    }
  }

  //O is Original location, D is original Destination
  //S is the customer Starting location, E is customer Ending location
  calculateDistance(latO, lngO, latD, lngD) {
    let latS = this.state.latS;
    let latE = this.state.latE;
    let lngS = this.state.lngS;
    let lngE = this.state.lngE;

    let leg1 = Math.sqrt(Math.pow(latO - latS, 2) + Math.pow(lngO - lngS, 2));
    let leg2 = Math.sqrt(Math.pow(latS - latE, 2) + Math.pow(lngS - lngE, 2));
    let leg3 = Math.sqrt(Math.pow(latE - latD, 2) + Math.pow(lngE - lngD, 2));

    //convert from lattitude to miles by * by 69
    let newDistance = (leg1 + leg2 + leg3) * 69;
    return newDistance;
  }

  checkAndCalculate(latO, lngO, latD, lngD) {
    let newDistance;
    if (
      this.state.latS + this.state.latE + this.state.lngS + this.state.lngE ===
      0
    ) {
      setTimeout(() => this.checkAndCalculate(), 100);
    } else {
      newDistance = this.calculateDistance(
        latO, lngO, latD, lngD
      );
      return newDistance;
    }
    return newDistance;
  }

  displayRoute(origin, destination, service, display) {
    service.route(
      {
        origin,
        destination,
        travelMode: "DRIVING",
        avoidTolls: true
      },
      (response, status) => {
        if (status === "OK") {
          if (this.state.deliveredBy > this.today) {
            display.setDirections(response);
          } else {
            alert("INVALID DATE");
          }
        } else {
          alert("COULD NOT DISPLAY DIRECTIONS DUE TO: " + status);
        }
      }
    );
  }

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

  handleInput(type) {
    return event => {
      this.setState({ [type]: event.target.value });
    };
  }

  async getGeo() {
    await this.geocodeAddress(this.geocoder, this.map, this.state.startLoc, "start");
    await this.geocodeAddress(this.geocoder, this.map, this.state.endLoc, "end");
    this.displayRoute(
      this.state.startLoc,
      this.state.endLoc,
      this.directionsService,
      this.directionsDisplay
    );
  }

  handleSearch() {
    this.sortTrips()
    // this.populateSearch();
  }

  handleSubmit() {
    this.props.submitOrder({
      accepted: false,
      deliveredBy,
      startLoc,
      endLoc,
      deliveredStatus: false,
      requestPending: false,
      rating: 0,
      price: price,
      comments: [],
      _driverId: driver,
      _tripId: trip,
    });
  }

  render() {
    if (this.props.entities.trips === null) {
      return <div>loading</div>;
    }
    // console.log(this.state);
    // this.sortTrips();
    return (
      <div>
        <h1>Send a Package Today</h1>

        <input
          type="text"
          id="cust-start"
          placeholder="Package Pick Up Location"
          onChange={this.handleInput("startLoc")}
        />
        <input
          type="text"
          id="cust-end"
          placeholder="Package Drop Off Location"
          onChange={this.handleInput("endLoc")}
        />

        <label>
          {" "}
          Deliver By:
          <input
            type="date"
            id="deliver-by"
            min={this.today}
            onChange={this.handleInput("deliveredBy")}
          />
        </label>

        <input
          type="submit"
          id="submit-search"
          value="Next"
          onClick={this.getGeo}
        />
      <br/>
        <input
          type="submit"
          id="submit-search"
          value="Finish/ Display Search"
          onClick={this.handleSearch}
        />

        <div ref="map" style={{ width: 400, height: 400 }} />

        <ul>
          {this.populateSearch()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ auth, entities }) {
  return {
    auth,
    entities
  };
}

export default connect(mapStateToProps, actions)(CustomersOrdersNew);
