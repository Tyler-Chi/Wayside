import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class CustomersOrdersHistory extends Component {
  componentWillMount() {
    this.props.fetchOrders();
  }

  render() {
    return <div>I AM CUSTOMERS ORDERS HISTORY</div>;
  }
}

export default connect(null, actions)(CustomersOrdersHistory);
