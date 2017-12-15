import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import CustomersOrdersHistoryIndexItem from "./CustomersOrdersHistoryIndexItem";

class CustomersOrdersHistory extends Component {
  componentWillMount() {
    this.props.fetchOrders();
  }

  render() {
    if (this.props.entities.orders === null) {
      return <div> LOADING </div>;
    }

    const { orders } = this.props.entities;
    const ordersArray = Object.values(orders);

    //once we are able to have drivers 'complete' orders
    //we can filter this ordersArray by that.

    //TODO here is what that would look like:

    //just have to specify the condition
    // ordersArray.filter(order => order.'condition')

    ordersArray.sort(function(a, b) {
      return a.deliveredBy - b.deliveredBy;
    });

    console.log("orders", ordersArray);

    return (
      <div className="">
        Customers Orders History
        {ordersArray.map(order => (
          <CustomersOrdersHistoryIndexItem key={order._id} order={order} />
        ))}
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

export default connect(mapStateToProps, actions)(CustomersOrdersHistory);
