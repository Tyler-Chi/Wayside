import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import DriversTripItem from "./DriversTripItem";
import "./DriversTripItem.css";
import {Link} from 'react-router-dom';

class DriversTripsHistory extends Component {
  //need to figure out the promises here -__-

  constructor(props){
    super(props);
    this.state = {
      type: 'history'
    };
  }

  componentDidMount() {
    //fetch all trips fetchs all the trips where the current user is the driver of that trip.
    this.props.fetchOrders().then(() => this.props.fetchAllTrips());
    window.scrollTo(0,0);
  }

  render() {
    console.log('props',this.props);
    
    if (
      this.props.entities.trips === null ||
      this.props.entities.orders === null
    ) {
      return <div>loading</div>;
    }
    const { trips } = this.props.entities;

    const ordersArray = Object.values(this.props.entities.orders);

    const tripsArray = Object.values(trips);
    const pastTrips = tripsArray
      .filter(trip => trip.completed === true)
      .sort(function(a, b) {
        return a.tripStartDate > b.tripStartDate;
      });

    if (pastTrips.length === 0){
      return (
      <div className="driver-history-all">
        <h2 className="driver-history-title barlow">TRIP HISTORY</h2>

       <p className = "empty-area"> You have not completed any trips yet. </p>
       
      <button onClick = {() => this.props.history.replace("/drivers/trips/new")}
      className = "empty-area-button"
      >
        Click here to post a new trip!
      </button>
      </div>

      )
    }

    return (
      <div className="driver-history-all">
        <h2 className="driver-history-title barlow">TRIP HISTORY</h2>

        <ul className="dth-ul">
          {pastTrips.map(trip => (
            <DriversTripItem
              key={trip._id}
              trip={trip}
              orders = {ordersArray.filter(order => order._tripId === trip._id )}
              type = {this.state.type}
              updateTrip={this.props.updateTrip}
            />
          ))}
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

export default connect(mapStateToProps, actions)(DriversTripsHistory);
