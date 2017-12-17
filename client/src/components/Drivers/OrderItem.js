import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import './DriversTripItem.css';

class OrderItem extends Component {

  constructor(props) {
    super(props);
  }

  //this lets the customer accept/reject the order
  //IF the requestPending is true.
  orderRequest() {
    const { order } = this.props;

    return (
      <div>
        {this.orderInfo()}

        <button
          onClick={()=>this.props.updateOrder(order._id,{
            requestPending: false,
            accepted: true})
          }> Accept order
        </button>

        <button
          onClick={()=>this.props.updateOrder(order._id,{
            requestPending: false,
            accepted: false})
          }> Reject order
        </button>

      </div>
    );
  }

  orderInfo() {
    const { order } = this.props;

    return (
      <div>
        <div>
          {order.startLoc} - {order.endLoc}, by {order.deliveredBy.toString().slice(0, 10)}
        </div>
        <div>Price: ${order.price}</div>
      </div>
    );
  }

//state is not updated, so the modal does not re-render yet. But refreshing the page will show correct order.
  render(){
    const { order, type } = this.props;

    if (type === 'requested') {
      return (
        <div>
          {this.orderRequest()}
        </div>
      );
    }

      if (type === 'accepted' && order.deliveredStatus === false) {
        return (
          <div>
            {this.orderInfo()}
            <h6>Accepted!</h6>
            <button
              onClick={()=>this.props.updateOrder(order._id,{
                deliveredStatus: true})
              }> Complete this Order
            </button>
          </div>
        );
      }
      if (type === 'accepted' && order.deliveredStatus === true){
        return (
          <div>
            {this.orderInfo()}
            <h6>Order Completed/ Delivered</h6>
          </div>
        );
      }


    if (type === 'rejected') {
      return (
        <div>
          {this.orderInfo()}
          <h6>Rejected!</h6>
        </div>
      );
    }

    // const { order } = this.props;
    //
    //   console.log('type',this.props.type);
    //
    // return (
    //   <div>
    //     {this.acceptOrder()}
    //     {this.completeOrder()}
    //   </div>
    // );
  }
}

function mapStateToProps({auth,entities}){
  return {
    auth,
    entities
  };
}

export default connect (mapStateToProps,actions)(OrderItem);
