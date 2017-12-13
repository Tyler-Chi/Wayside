/* eslint-disable no-undef */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

// const kmToMile = 0.621371/1000;

const mapOptions = {
  zoom: 3,
  center: {lat: 40.612969, lng: -96.455751 } //center at the US
};


class DriversTripsNew extends Component {
  constructor(props) {
    super(props);
    this.submitAndDisplay = this.submitAndDisplay.bind(this);
  }

  componentDidMount() {
    const map = this.refs.map;
    //define where our initial map should be centered
    this.map = new google.maps.Map(map, mapOptions);
    //DirectionsService take care of handling our map direction
    this.directionsService = new google.maps.DirectionsService();

  //DirectionsRenderer will take care of displaying the route onto
  //the map and direction onto panel, just comment out panel:... if dont wanna show direction
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map,
      panel: document.getElementById('direction-panel'),
    });
  }

  //this handles displaying the route onto the map.
  displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
      avoidTolls: true
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  submitAndDisplay() {
    let origin = document.getElementById('cust-start').value;
    let destination = document.getElementById('cust-end').value;
    let tripStartDate = document.getElementById('date-start').value;
    let tripEndDate = document.getElementById('date-end').value;

    this.props.submitTrip({
      origin,
      destination,
      tripStartDate,
      tripEndDate,
      completed: false
    });
    this.displayRoute(
      origin, destination,
      this.directionsService, this.directionsDisplay
    );
  }

  render() {
    return (
      <div>
        <h1>I am drivers trips new</h1>

        <input type="text" id="cust-start" placeholder="Start"></input>
        <input type="text" id="cust-end" placeholder="End"></input>
        <label> Trip Start Date
          <input type="date" id="date-start" placeholder="Date Start"></input>
        </label>
        <label> Trip End Date
          <input type="date" id="date-end" placeholder="Date End"></input>
        </label>
        <input type="submit" id="submit" value="Create New Trip"
          onClick={() => this.submitAndDisplay()} />
        <br />
        <div ref="map" style={{width: 400, height: 400}}>
          Map
        </div>
        <div id="direction-panel"></div>
      </div>
    );
  }
}

export default connect(null, actions)(DriversTripsNew);

//actions contains submitTrip.
