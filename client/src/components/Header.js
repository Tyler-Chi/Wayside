import React, { Component } from "react";
import { connect } from "react-redux";
import "./Overall_CSS/Header.css";
import * as actions from '../actions';
import { Redirect } from 'react-router';
//here, have access to this.props.auth
//if it is false, the user is not logged in
//otherwise, there is a user and you can access the username and other data
class Header extends Component {
  constructor(props) {
    super(props);
    this.props.fetchOrders();

    this.loginLogout = this.loginLogout.bind(this);
    this.currentTab = this.currentTab.bind(this);
  }

  currentTab(string){
    let fullCurrent = this.props.location.pathname.split("/");

    if (fullCurrent[1] === "drivers") {
      if (fullCurrent[3] === "upcoming" && string === "upcoming-trips") {
        return "currentTab";
      }
      else if (fullCurrent[3] === "history" && string === "past-trips")  {
        //they're in drivers trips history
        return "currentTab";
        // console.log("HERE IS THE ELEMENT", document.getElementsByClassName("past-trips"));
        // document.getElementsByClassName("past-trips").style.background = "red";
      } else if (fullCurrent[3] === "new" && string === "new-trips") {
        return "currentTab";
      }
    } else {
      if (fullCurrent[3] === "new" && string === "new-orders"){
        return "currentTab";
      }
      else if (fullCurrent[3] === "upcoming" && string === "pending-orders"){
        return "currentTab";
      }
      else if (fullCurrent[3] === "history" && string === "past-orders"){
        return "currentTab";
      }
      // they're customers

    }

  }


  customerDriver(){

    let current = (this.props.location.pathname.split("/")[1]);
    let fullCurrent = this.props.location.pathname.split("/");
    let user = this.props.auth;

    if (current === 'customers'){

      const allOrders = Object.values(this.props.entities.orders);
      //first, filter them out by request pending, and accepted is false
      let customerPendingOrders = allOrders.filter(order => order.requestPending === true);
      //filter them where the current user is the owner of the order
      customerPendingOrders = customerPendingOrders.filter(order => this.props.auth._id === order._ownerId);


      return (
        <div className="nav-right">
          <button
            className={this.currentTab("pending-orders")}
            onClick={()=>this.props.history.replace('/customers/orders/upcoming')}
            >Pending Orders </button>
          <button
            className={this.currentTab("past-orders")}
            onClick={()=>this.props.history.replace('/customers/orders/history')}
            >Order History</button>
          <button
            className={this.currentTab("new-orders")}
            onClick={()=>this.props.history.replace('/customers/orders/new')}
            >Send a Package</button>
          <button
            className={this.currentTab("become-driver")}
            onClick={()=>this.props.history.replace('/drivers/trips/new')}
            >Become a Driver!</button>

          <a
            className="logout"
            href="/api/logout"
            >Log out</a>
          <div>
            <img src={user.imageUrl} className="driver-img"></img>
          </div>

        </div>
      );
    } else {

      const allTrips = Object.values(this.props.entities.trips);
      //first filter by not completed trips
      let driverUpcomingTrip = allTrips.filter(trip => trip.completed === false);
      //then filter where the current user is the driver of the trip
      driverUpcomingTrip = driverUpcomingTrip.filter(trip => this.props.auth._id === trip._user);

      return (

        <div className="nav-right">
          <button
            className={this.currentTab("upcoming-trips")}
            onClick={()=> this.props.history.replace('/drivers/trips/upcoming')}
            >Upcoming Trips ({driverUpcomingTrip.length})</button>
          <button
            className={this.currentTab("past-trips")}
            onClick={()=> this.props.history.replace('/drivers/trips/history')}
            >Past Trips</button>
          <button
            className={this.currentTab("new-trips")}
            onClick={()=> this.props.history.replace('/drivers/trips/new')}
            >New Trip</button>
          <button
            className={this.currentTab("become-customer")}
            onClick={()=> this.props.history.replace('/customers/orders/new')}
            >Send a Package</button>
          <a
            className="logout"
            href="/api/logout"
            >Log out</a>
          <div>
            <img src={user.imageUrl} className="driver-img"></img>
          </div>

        </div>

      );
    }
  }

  demoLogin(){
    this.props.fetchDemo();
    this.props.history.push('/customers/orders/new');
  }

  loginLogout(){
    //do this if they are already logged in.
    if (this.props.auth){
      return (
        this.customerDriver()
      );
    } else {


      return (
        <div className="login">
          <button className="login-demo"
            onClick={()=>
              this.demoLogin()}
            >Demo Login</button>
          <a className="login-google" href="/auth/google">Log in with Google</a>
        </div>

      );
    }
  }

  render() {
    //the a href thing makes the get request to /auth/google
    //this get request executes the google Login
    //i still need to have this redirect to normal

    //this anchor to logout makes a get request to the api/logout. in authRoutes, this handles logout logic, as well as redirection.
    return (
      <div className="nav-outer">
        <div className="nav">
          <div className="nav-inner">
            <div className="left">
              <a className="title pacifico" href="/">
                WaySide
              </a>
            </div>
            <div>
              {this.loginLogout()}

            </div>

          </div>
        </div>
        <div className="nav-spacer">
        </div>
      </div>
    );
  }
}

//this is essentially our container.
//connect gives mapStateToProps and mapDispatchToProps access to the store's state
//here, we are just passing in the auth portion of state into this component Header.
function mapStateToProps({ auth, entities}) {
  return { auth , entities};
}

export default connect(mapStateToProps,actions)(Header);
