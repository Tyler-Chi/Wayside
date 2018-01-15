import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import CustomersOrderItem from "./CustomersOrderItem";
import "./CustomersOrderItem.css";

class CustomersOrdersHistory extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    if (this.props.entities.orders === null) {
      return <div> LOADING </div>;
    }

    const { orders } = this.props.entities;
    const ordersArray = Object.values(orders);
    const ordersHistory = ordersArray
      .filter(order => (order._ownerId === this.props.auth._id && order.deliveredStatus === true))
      .sort(function(a,b) { return a.deliveredBy > b.deliveredBy; });

    if (ordersHistory.length === 0){
      return (
        <div className="customer-orders-all">
          <h2 className="customer-orders-title barlow">ORDER HISTORY</h2>

          <p> Join our thousands of satisfied customers and ship something today :) </p>
          <button onClick={() => this.props.history.replace("/customers/orders/new")}
            className="empty-area-button"
          >
            Click here to place your first order!
          </button>

        </div>
      )
    }

    return (
      <div className="customer-orders-all">
        <h2 className="customer-orders-title barlow">ORDER HISTORY</h2>

        <ul className="customer-orders-list">
          {ordersHistory.map(order => (
            <CustomersOrderItem
              key={order._id}
              order={order}
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

export default connect(mapStateToProps, actions)(CustomersOrdersHistory);
