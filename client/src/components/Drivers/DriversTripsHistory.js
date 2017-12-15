import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import DriversTripItem from "./DriversTripItem";
import './DriversTripItem.css';

class DriversTripsHistory extends Component {
  //need to figure out the promises here -__-
  componentDidMount() {
    //fetch all trips fetchs all the trips where the current user is the driver of that trip.
    this.props.fetchAllTrips();
    this.props.fetchOrders();
  }

  render() {
    if (this.props.entities.trips === null) {
      return <div>loading</div>;
    }

    const { trips } = this.props.entities;
    let tripsArray = Object.values(trips);
    console.log("tripsArray", tripsArray);
    const pastTrips = tripsArray.filter(trip => trip.completed === true);


    return (
      <div className="drivers-trips-history-index-area">
        <h2 className="past-deliveries">Past Deliveries</h2>

        <ul className="dth-ul">
          {pastTrips.map(trip => (
            <DriversTripItem
              key={trip._id}
              trip={trip} />
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
