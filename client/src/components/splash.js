import React, { Component } from "react";
import { connect } from "react-redux";

class Splash extends Component {
  render() {
    return <div>Hello world!</div>;
  }
}

export default connect()(Splash);
