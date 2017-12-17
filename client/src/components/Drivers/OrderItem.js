import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import './DriversTripItem.css';

class OrderItem extends Component {

  constructor(props){
    super(props)
  }


  //this lets the customer accept/reject the order
  //IF the requestPending is true.
  acceptOrder(){
    const { order } = this.props;

    if (order.requestPending === true ){
      return (
        <div>

        <button
        onClick={()=>this.props.updateOrder(order._id,{
          requestPending: false,
          accepted: true
        })
        }
        >
        accept order
        </button>

        <button
        onClick={()=>this.props.updateOrder(order._id,{
          requestPending: false,
          accepted: false
        })
        }
        >
        reject order
        </button>

        </div>
      )
    } else {
      return (
        <div>

        </div>
      )
    }

  }

  completeOrder(){
    const { order } = this.props;

    if (order.accepted === true && order.requestPending === false){
      <div>
        <button
        onClick={()=>this.props.updateOrder(order._id,{
          completed: true
        })}
        >
        just completed order
        </button>
      </div>
    } else {
      return (
        <div>
        (Rejected Order)
        </div>
      )
    }
  }



  render(){

    const { order } = this.props;

      console.log('type',this.props.type);

    return (
      <div>
      hello world
        {this.acceptOrder()}
        {this.completeOrder()}
      </div>
    )
  }
}

function mapStateToProps({auth,entities}){
  return {
    auth,
    entities
  }
}

export default connect (mapStateToProps,actions)(OrderItem);
