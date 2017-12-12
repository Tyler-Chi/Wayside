import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    console.log(this.props);
    return <div>Header</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
