/* eslint-disable no-undef */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import './DriversTripsNew.css';
// const kmToMile = 0.621371/1000;

const mapOptions = {
  zoom: 3,
  center: {lat: 40.612969, lng: -96.455751 } //center at the US
};

class DriversTripsNew extends Component {
  constructor(props) {
    super(props);
    this.submitAndDisplay = this.submitAndDisplay.bind(this);
    this.today = new Date().toJSON().split('T')[0];
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
    let origin = document.getElementById('driver-start').value;
    let destination = document.getElementById('driver-end').value;
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
      <div className="trip-new">

        <h1 className="form-title barlow">DRIVERS</h1>
        <h2 className="form-description open">Make bank by posting your trip route</h2>
          <h3 className="form-start-loc">Starting Location</h3>
            <input  type="text" id="driver-start" placeholder=""></input>

          <h3 className="form-end-loc open">Destination</h3>
            <input  type="text" id="driver-end" placeholder=""></input>

          <div className="form-dates open">
            <div className="form-date-input">
              <h3>Departure Date</h3>
              <input type="date" id="date-start" min={this.today}></input>
            </div>

            <div className="form-date-input">
              <h3>Arrival Date</h3>
              <input type="date" id="date-end" min={this.today}></input>
            </div>
          </div>

          <input
            type="submit" id="submit"
            value="Create New Trip"
            onClick={() => this.submitAndDisplay()} />



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
