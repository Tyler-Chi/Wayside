import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import DriversTripsHistoryIndexItem from "./DriversTripsHistoryIndexItem";

class DriversTripsHistory extends Component {
  //need to figure out the promises here -__-
  componentDidMount() {
    this.props.fetchCompletedTrips();
  }

  render() {
    if (this.props.entities.trips === null) {
      return <div>loading</div>;
    }

    const { trips } = this.props.entities;

    let tripsArray = Object.values(trips);

    console.log("props", this.props);
    console.log("trips", trips);

    return (
      <div className="drivers-trips-history-index-area">
        <p className="past-deliveries">Past Deliveries</p>
        <ul className="dth-ul">
          {tripsArray.map(trip => (
            <DriversTripsHistoryIndexItem trip={trip} key={trip._id} />
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
