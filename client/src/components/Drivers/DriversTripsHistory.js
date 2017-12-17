import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import DriversTripItem from "./DriversTripItem";
import "./DriversTripItem.css";

class DriversTripsHistory extends Component {
  //need to figure out the promises here -__-

  constructor(props){
    super(props);
    this.state = {
      type: 'history'
    }
  }

  componentDidMount() {
    //fetch all trips fetchs all the trips where the current user is the driver of that trip.
    this.props.fetchOrders();
    this.props.fetchAllTrips();
  }

  render() {
    if (
      this.props.entities.trips === null ||
      this.props.entities.orders === null
    ) {
      return <div>loading</div>;
    }
    const { trips } = this.props.entities;

    const ordersArray = Object.values(this.props.entities.orders);

    console.log("ordersArray", ordersArray);

    let tripsArray = Object.values(trips);
    console.log("tripsArray", tripsArray);
    const pastTrips = tripsArray.filter(trip => trip.completed === true);
    // console.log('pasttrip', pastTrips);
    const pastTrips2 = tripsArray
      .filter(trip => trip.completed === true)
      .sort(function(a, b) {
        return a.tripStartDate > b.tripStartDate;
      });
    // console.log(pastTrips2);

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
