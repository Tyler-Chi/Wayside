import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import DriversTripItem from "./DriversTripItem";
import './DriversTripItem.css';

class DriversTripsUpcoming extends Component {

  constructor(props){
    super(props);
    this.state = {
      type: 'upcoming'
    };
  }

  componentDidMount() {
    //this fills the trips slice of state with this users
    //trips that they will go on in the future.
    this.props.fetchOrders();
    this.props.fetchAllTrips();
    window.scrollTo(0,0);
  }

  render() {
    if (this.props.entities.trips === null || this.props.entities.orders === null) {
      return <div> Loading </div>;
    }

    const { trips } = this.props.entities;

    console.log('trips',trips);

    const tripsArray = Object.values(trips);
    const upcomingTrips = tripsArray
                        .filter(trip => trip.completed === false)
                        .sort(function(a, b) { return a.tripStartDate > b.tripStartDate; });

    const ordersArray = Object.values(this.props.entities.orders);


    return(
      <div className="driver-upcoming-all">
        <h2 className="driver-upcoming-title barlow">UPCOMING TRIPS</h2>

        <ul className="driver-upcoming-list">
          {upcomingTrips.map(trip => (
            <DriversTripItem
              key={trip._id}
              trip={trip}
              orders = {ordersArray.filter(order => order._tripId === trip._id)}
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

export default connect(mapStateToProps, actions)(DriversTripsUpcoming);
