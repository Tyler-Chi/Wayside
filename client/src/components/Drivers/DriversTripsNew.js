/* eslint-disable no-undef */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import './DriversTripsNew.css';

const kmToMile = 0.621371/1000;
const mapOptions = {
  zoom: 3,
  center: {lat: 40.612969, lng: -96.455751 } //center at the US
};

class DriversTripsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: "",
      destination: "",
      tripStartDate: "",
      tripEndDate: "",
      tripDistance: 0
    };

    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.today = new Date().toJSON().split('T')[0];
  }

  componentDidMount() {
    const map = this.refs.map;
    //define where our initial map should be centered
    this.map = new google.maps.Map(map, mapOptions);
    //DirectionsService take care of handling our map direction
    this.directionsService = new google.maps.DirectionsService();

    //Geocoder handlles translating from regular address to LatLng
    this.geocoder = new google.maps.Geocoder();

  //DirectionsRenderer will take care of displaying the route onto
  //the map and direction onto panel, just comment out panel:... if dont wanna show direction
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map,
      // panel: document.getElementById('direction-panel'),
    });

    this.geocodeAddress(this.geocoder, this.map, "825 battery st, san francisco, ca");
  }

  geocodeAddress(geocoder, map, address) {
    geocoder.geocode({ 'address': address }, (result, status) => {
      if (status !== 'OK') {
        alert('INVALID ADDRESS DUE TO: ' + status);
      } else {
        console.log(result[0].geometry.location.lat());
      }
    });
  }

  // convertAddress() {
  //   const map = this.refs.map;
  //   this.map = new google.maps.Map(map, mapOptions);
  //   this.geocoder = new google.maps.Geocoder();
  //   this.geocodeAddress(this.geocoder, this.map, "san francisco");
  // }


  //this handles displaying the route onto the map.
  displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
      avoidTolls: true
    }, (response, status) => {
      if (status === 'OK') {
        display.setDirections(response);

        let route = response.routes[0];
        //use Math ceil to round up the total miles of the trip
        let tripDistance = Math.ceil((route.legs[0].distance.value * kmToMile));
        this.setState ({ tripDistance: tripDistance });
      } else {
        alert('COULD NOT DISPLAY DIRECTIONS DUE TO: ' + status);
      }
    });
  }

  handleInput(type) {
    return (event) => {
      this.setState({ [type]: event.target.value});
    };
  }

  handleDisplay() {
    let origin = this.state.origin;
    let destination = this.state.destination;
    if (this.state.tripStartDate < this.today ||
        this.state.tripEndDate < this.state.tripStartDate) {
          alert('INVALID START OR END DATE');
        } else {
      this.displayRoute(
        origin, destination,
        this.directionsService, this.directionsDisplay
      );
    }
    window.scrollTo(0,800);
  }

  handleSubmit() {
    this.props.submitTrip({
      origin: this.state.origin,
      destination: this.state.destination,
      tripStartDate: this.state.tripStartDate,
      tripEndDate: this.state.tripEndDate,
      tripDistance: this.state.tripDistance,
      completed: false
    });
  }

  render() {
    return (
      <div className="trip-new">

        <h1 className="form-title barlow">DRIVERS</h1>
        <h2 className="form-description open">Make bank by posting your trip route</h2>
          <h3 className="form-start-loc">Starting Location</h3>
            <input  type="text" id="driver-start"
              placeholder=""
              onChange={this.handleInput('origin')}></input>

          <h3 className="form-end-loc open">Destination</h3>
            <input  type="text" id="driver-end"
              placeholder=""
              onChange={this.handleInput('destination')}></input>

          <div className="form-dates open">
            <div className="form-date-input">
              <h3>Departure Date</h3>
              <input type="date" id="date-start"

                min={this.today}
                onChange={this.handleInput('tripStartDate')}></input>
            </div>

            <div className="form-date-input">
              <h3>Arrival Date</h3>
              <input type="date" id="date-end"
                value={this.state.tripStartDate}
                min={this.state.tripStartDate}
                onChange={this.handleInput('tripEndDate')}></input>
            </div>
          </div>
          <div className="map-div">
            <input
              type="submit" id="submit"
              value="Next"
              className="map-button"
              onClick={this.handleDisplay} />

            <div className="map" ref="map" style={{width: 700, height: 700}}>
              Map
            </div>
            <div id="direction-panel"></div>

            <h5 className="confirm-q">Is this the route you're taking?</h5>
            <button className="confirm-trip" onClick={this.handleSubmit}>
              Confirm Trip
            </button>

        </div>




      </div>
    );
  }
}

export default connect(null, actions)(DriversTripsNew);


//actions contains submitTrip.
