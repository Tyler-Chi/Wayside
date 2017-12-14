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
      newTime: 0,
      newDistance: 0,
      originalDistance: 0,
      originalTime: 0,
      deliveredBy: "",
      startLoc: "",
      endLoc: ""
    };
    this.today = new Date().toJSON().split('T')[0];
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllUpcoming();
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
    trips.forEach(trip => {
      console.log(trip);
    });
  }

  handleInput(type) {
    return (event) => {
      this.setState({ [type]: event.target.value });
    };
  }

  handleSearch() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
    this.directionsService = new google.maps.DirectionsService();

    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map
    });

    this.displayRoute(
      this.state.startLoc,
      this.state.endLoc,
      this.directionsService,
      this.directionsDisplay
    );
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
    this.sortTrips();
    // console.log(this.props.entities.trips);
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


  // checkDistance(origin, checkpoint) {
  //   //DistanceMatrixService will check the distance between
  //   //array of origins and array of destinations (cross-check)
  //   var checkDistance;
  //   let serviceMatrix = new google.maps.DistanceMatrixService();
  //
  //   serviceMatrix.getDistanceMatrix({
  //     origins: [origin],
  //     destinations: [checkpoint],
  //     travelMode: 'DRIVING',
  //     unitSystem: google.maps.UnitSystem.IMPERIAL,
  //     avoidHighways: false,
  //     avoidTolls: true
  //   }, function(response, status) {
  //     if (status !== 'OK') {
  //       alert('Error was: ' + status);
  //     } else {
  //       checkDistance = response.rows[0].elements[0].distance.value;
  //       checkDistance = Math.ceil(checkDistance * kmToMile);
  //     }
  //   });
  //   return checkDistance;
  // }
