import React, { Component } from "react";
import { connect } from "react-redux";

class DriversNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DL: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.props.auth;
    user.DL = document.getElementById('DL').value;
    user.address = document.getElementById('home-address').value;
    user.vehicle = document.getElementById('vehicle-detail').value;
    user.plate = document.getElementById('license-plate').value;
    // console.log(user);
  }

  render() {

    return (
      <div>
        <h1>Become a Driver?</h1>
        <h3>Enter your information below</h3>
        <label>Driver License:
          <input id="DL" placeholder="i.e. D1234567"></input>
        </label>
        <label>Home Address (can be different from future trips addresses):
          <input
            id="home-address"
            placeholder="i.e. 123 Battery St., San Francisco CA 12345"></input>
        </label>
        <label>Vehicle Details:
          <input
            id="vehicle-detail"
            placeholder="i.e. Toyota Camry 2015"></input>
        </label>
        <label>License Plate:
          <input
            id="license-plate"
            placeholder="i.e. 1XYZ234"></input>
        </label>

        <input
          id="driver-submit"
          type="submit"
          value="Confirm and Submit"
          onClick={this.handleSubmit}></input>
      </div>
    );
  }
}

const mapStateToProps = ({auth, entities}) => ({
  auth,
  entities
});

export default connect(mapStateToProps)(DriversNew);
