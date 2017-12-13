import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class DriversTripsHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  //need to figure out the promises here -__-
  componentWillMount() {
    this.props.fetchCompletedTrips();
    setTimeout(() => this.setState({ loading: false }), 2000);
  }

  render() {
    if (this.state.loading) {
      return <div>loading</div>;
    }

    const { trips } = this.props.entities;
    console.log("trips", trips);

    return (
      <div className="drivers-trips-history-index-area">
        <p className="past-deliveries">Past Deliveries</p>
        {trips.map(trip => <p> hi </p>)}
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
