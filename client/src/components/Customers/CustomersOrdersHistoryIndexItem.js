import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";

class CustomersOrdersHistoryIndexItem extends Component {
  render() {
    const { order } = this.props;
    const trip = this.props.order.tripObject;
    const driver = this.props.order.tripObject.userObject;
    return <div>I am a COHII</div>;
  }
}

export default connect(null, actions)(CustomersOrdersHistoryIndexItem);
