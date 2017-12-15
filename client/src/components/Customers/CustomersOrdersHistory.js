import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class CustomersOrdersHistory extends Component {
  componentWillMount() {
    this.props.fetchOrders();
  }

  render() {
    if (this.props.entities.orders === null) {
      return <div> LOADING </div>;
    }

    return <div className="">Customers Orders History</div>;
  }
}
function mapStateToProps({ auth, entities }) {
  return {
    auth,
    entities
  };
}

export default connect(mapStateToProps, actions)(CustomersOrdersHistory);
