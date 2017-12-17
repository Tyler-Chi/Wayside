import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import CustomersOrderItem from "./CustomersOrderItem";
import "./CustomersOrderItem.css";

class CustomersOrdersUpcoming extends Component {
  componentWillMount() {
    this.props.fetchOrders();
  }

  render() {
    if (this.props.entities.orders === null) {
      return <div> LOADING </div>;
    }
    
    if (this.props.auth === undefined) {
      setTimeout(() => this.render(), 30);
    }
    else  {
      const { orders } = this.props.entities;
      const ordersArray = Object.values(orders);
      const ordersHistory = ordersArray
      .filter(order => (order._ownerId === this.props.auth._id && order.deliveredStatus === false))
      .sort(function(a,b) { return a.deliveredBy > b.deliveredBy; });

      return (
        <div className="customer-orders-all">
          <h2 className="customer-orders-title barlow">FUTURE ORDERS</h2>

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
}

function mapStateToProps({ auth, entities }) {
  return {
    auth,
    entities
  };
}

export default connect(mapStateToProps, actions)(CustomersOrdersUpcoming);
