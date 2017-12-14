/* eslint-disable no-undef */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

const kmToMile = 0.621371/1000;

const mapOptions = {
  zoom: 3,
  center: {lat: 40.612969, lng: -96.455751 } //center of US
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
      lngE: 0,
    };
    this.today = new Date().toJSON().split('T')[0];
    this.handleSearch = this.handleSearch.bind(this);
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
    window.scrollTo(0,0);
  }

  geocodeAddress(geocoder, map, address, type) {
    geocoder.geocode({ 'address': address }, (result, status) => {
      if (status !== 'OK') {
        alert('INVALID ADDRESS DUE TO: ' + status);
      } else {
        let lat = result[0].geometry.location.lat();
        let lng = result[0].geometry.location.lng();
        if (type === 'start') {
          this.setState({
            latS: lat,
            lngS: lng,
          });
        } else if (type === 'end') {
          this.setState({
            latE: lat,
            lngE: lng,
          });
        }
      }
    });
  }

  //O is Original location, D is original Destination
  //S is the customer Starting location, E is customer Ending location
  calculateDistance(latO, lngO, latD, lngD) {
    let latS = this.state.latS;
    let latE = this.state.latE;
    let lngS = this.state.lngS;
    let lngE = this.state.lngE;

    let leg1 = Math.sqrt(Math.pow((latO - latS),2) + Math.pow((lngO - lngS),2));
    let leg2 = Math.sqrt(Math.pow((latS- latE),2) + Math.pow((lngS - lngE),2));
    let leg3 = Math.sqrt(Math.pow((latE - latD),2) + Math.pow((lngE - lngD),2));

    let newDistance = leg1 + leg2 + leg3;
    console.log(newDistance);
  }

  displayRoute(origin, destination, service, display) {
    service.route({
      origin,
      destination,
      travelMode: 'DRIVING',
      avoidTolls: true
    }, (response, status) => {
      if (status === 'OK') {
        if (this.state.deliveredBy > this.today) {
          display.setDirections(response);
        } else {
          alert('INVALID DATE');
        }
      } else {
        alert('COULD NOT DISPLAY DIRECTIONS DUE TO: ' + status);
      }
    });
  }

  sortTrips() {
    let trips = this.props.entities.trips;
    Object.values(trips).forEach(trip => {
      // console.log(trip);
    });
  }

  handleInput(type) {
    return (event) => {
      this.setState({ [type]: event.target.value });
    };
  }

  handleSearch() {
    this.displayRoute(
      this.state.startLoc,
      this.state.endLoc,
      this.directionsService,
      this.directionsDisplay
    );

    this.geocodeAddress(this.geocoder, this.map, this.state.startLoc, 'start');
    this.geocodeAddress(this.geocoder, this.map, this.state.endLoc, 'end');

    this.calculateDistance(37.7989666, -122.40135180, 37.4296964, -121.9171665);

    // this.props.submitOrder({
    //   accepted: false,
    //   deliveredBy,
    //   startLoc,
    //   endLoc,
    //   deliveredStatus: false,
    //   requestPending: false,
    //   rating: 0,
    //   price: 0,
    //   comments: []
    // });
  }

  render() {
    if (this.props.entities.trips === null) {
      return <div>loading</div>;
    }
    console.log(this.state);
    // this.sortTrips();
    return (
      <div>
        <h1>Send a Package Today</h1>

        <input type="text" id="cust-start"
          placeholder="Package Pick Up Location"
          onChange={this.handleInput('startLoc')}></input>
        <input type="text" id="cust-end"
          placeholder="Package Drop Off Location"
          onChange={this.handleInput('endLoc')}></input>

        <label> Deliver By:
          <input type="date" id="deliver-by"
            min={this.today}
            onChange={this.handleInput('deliveredBy')}></input>
        </label>

        <input type="submit" id="submit-search"
          value="Search for a Driver"
          onClick={this.handleSearch} />

        <div ref="map" style={{width: 400, height: 400}}></div>

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
