/* eslint-disable no-undef */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import CustomersOrdersNewIndex from './CustomersOrdersNewIndex';

const MAPOPTIONS = {
  zoom: 4,
  center: { lat: 40.612969, lng: -96.455751 } //center of US
};
//rate per mile
const RATE = 0.25;
//radius of trip finding
const RADIUS = 100;

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
      lngE: 0,
      display: false
    };
    this.today = new Date().toJSON().split("T")[0];

    this.handleSearch = this.handleSearch.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);
    this.checkAndCalculate = this.checkAndCalculate.bind(this);
    this.sortTrips = this.sortTrips.bind(this);
    this.getGeo = this.getGeo.bind(this);

  }

  componentDidMount() {
    this.props.fetchAllUpcoming();
    const map = this.refs.map;
    this.map = new google.maps.Map(map, MAPOPTIONS);
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
      this.newDistance = Math.ceil(this.checkAndCalculate(trip.latO, trip.lngO, trip.latD, trip.lngD));
      // this.newDistance = this.newDistance.toFixed(2);
      let oldDistance = trip.tripDistance;
      this.difference = this.newDistance - oldDistance;

      let tripPrice = (this.difference * RATE).toFixed(2);
      if ( (this.difference <= RADIUS) && (this.state.deliveredBy >= trip.tripEndDate) ) {
        this.props.updateTrip(trip._id, { price: tripPrice,
        tripNewDistance: this.newDistance });
        filterTrips.push(trip);
      }
    });
    this.searchTrips = filterTrips;
    this.setState({ display: false });

    return filterTrips;
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
      setTimeout(() => this.checkAndCalculate(), 50);
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
    this.sortTrips();
    window.scrollTo(0,800);
  }

  handleSearch() {
    this.sortTrips();
    //if there is no matching trip, toggles display so that state changes => re-render
    if (this.searchTrips.length === 0) {
      this.setState({ display: true });
    }
    // setTimeout(() => this.checkAndCalculate(), 50);
    setTimeout(() => window.scrollTo(0, 1500), 50);
  }

  render() {
    if (this.props.entities.trips === null) {
      return <div>loading</div>;
    }

    return (
      <div className="trip-new">
        <h1 className="form-title barlow">CUSTOMERS</h1>
        <h2 className="form-description open">Send A Package Today</h2>

        <h3 className="form-start-loc">Package Pick Up Location</h3>
        <input
          type="text"
          id="cust-start"
          placeholder=""
          onChange={this.handleInput("startLoc")}
        />

        <h3 className="form-end-loc open">Package Drop Off Location</h3>
        <input
          type="text"
          id="cust-end"
          placeholder=""
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

        <div className="map-div">
          <input
            type="submit"
            id="submit"
            value="Next"
            className="map-button"
            onClick={this.getGeo}
            />

          <div className="map" ref="map" style={{ width: 700, height: 700 }} />

          <input
            type="submit"
            id="submit"
            className="map-button"
            value="Search for Drivers"
            onClick={this.handleSearch}
            />
        </div>


        <CustomersOrdersNewIndex
          filterTrips={this.searchTrips}
          startLoc={this.state.startLoc}
          endLoc={this.state.endLoc}
          map={this.map}
          service={this.directionsService}
          display={this.directionsDisplay}
          submitOrder={this.props.submitOrder}
          displayMessage={this.state.display}
          history={this.props.history}
          />

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
