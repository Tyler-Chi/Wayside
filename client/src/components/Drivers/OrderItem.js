import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import './DriversTripItem.css';

class OrderItem extends Component {

  constructor(props){
    super(props)
  }

  accepted(){

  }



  render(){

    const { order } = this.props;
  

    return (
      <div>
        i am groot
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
