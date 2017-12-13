//Trung

import React, { Component } from "react";
import { connect } from "react-redux";

// const kmToMile = 0.621371/1000;
// //this is the World map
// const mapOptions = {
//   zoom: 4,
//   center: {lat: 40.612969, lng: -96.455751 }
// };

class CustomersOrdersNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTime: 0,
      newDistance: 0,
      originalDistance: 0,
      originalTime: 0
    };
  }


  render() {
    return <div>I AM CUSTOMERS ORDERS NEW</div>;
  }
}

export default connect()(CustomersOrdersNew);
