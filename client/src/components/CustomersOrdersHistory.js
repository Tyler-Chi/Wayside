import React, { Component } from "react";
import { connect } from "react-redux";

class CustomersOrdersHistory extends Component {
  render() {
    return <div>I AM CUSTOMERS ORDERS HISTORY</div>;
  }
}

export default connect()(CustomersOrdersHistory);
