import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// Pass in as props
// pendingOrders <= array of orders objects
// each has driver name, driver img, id, price, deliveryDate, status,

// pending requests count <= an integer
// currentUser

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handlePendingRequests = this.handlePendingRequests.bind(this);
    this.driverPageRedirect = this.driverPageRedirect.bind(this);
    this.driverPageButton = this.driverPageButton.bind(this);
    this.state = {
      pendingDivActive: false,
    };
  }

  handlePendingRequests(pendingOrders){
    let currentState = this.state.pendingDivActive;
    this.setState({pendingDivActive: currentState});
  }
  driverPageRedirect(){
    if (this.props.currentUser.registeredDriver){
      return ("main");
    } else {
      return ("new");
    }
  }
  driverPageButton(){
    if (this.props.currentUser.registeredDriver){
      return ("Deliver Packages");
    } else {
      return ("Become a Driver");
    }
  }


  // Links on the top right of Nav differ depending on if they're Drivers or Customers
  sessionLinks(){
    if (this.props.formType === "customer"){
      let dropdownOpen = this.state.pendingDivActive;
      return(
        <nav className="customer-nav">
          <div  className={this.state.pendingDivActive ? "customer-pending-orders-active" : "customer-pending-orders-inactive"}
                onClick={this.handlePendingRequests(this.props.pendingOrders)}>

            Pending Request `${this.props.pending_request_count}`

            <ul className="customer-pending-orders-index">
              this.props.pendingOrders.map(pendingOrder => (
                <Link key={pendingOrder.id}
                      className={"customer-pending-orders-item-" + dropdownOpen}
                      to={"/orders/"+ pendingOrder.id}>

                  <div className="customer-pending-orders-item-top">
                    <img src={pendingOrder.driver.userImg}/>
                    <h4>pendingOrder.driver.username</h4>
                    <h4>pendingOrder.price</h4>
                  </div>
                  <div className="customer-pending-orders-item-bot">
                    <h4>pendingOrder.deliveryDate</h4>
                    <h4>pendingOrder.status</h4>
                  </div>
                </Link>
              ))
            </ul>
          </div>

          <Link className="customer-nav-order-history"
                to="/orders/history">Order History</Link>
          <Link className="customer-nav-driver-redirect"
                to={"/driver/" + this.driverPageRedirect}>`${this.driverPageButton}`</Link>

          <img  className="customer-nav-current-user-img"
                src={this.props.currentUser.userImg}/>
        </nav>
      );
    }
    else {
      return(
        <nav className="driver-nav">
          <Link className="driver-nav-orders-upcoming"
                to="/driver/orders/upcoming">Upcoming Deliveries</Link>
          <Link className="driver-nav-orders-history"
            to="/driver/orders/history">Delivery History</Link>
          <Link className="driver-nav-customer-redirect"
            to={"/orders/new"}>Send a Package</Link>
          <img  className="customer-nav-current-user-img"
                src={this.props.currentUser.userImg}/>
        </nav>
      );
    }
  }

  personalGreeting(){

    let currentUser = this.props.currentUser;
    if (currentUser){
      return(
        <div className="nav-bar-right">
          this.sessionLinks()
          <button className="nav-bar-logout" onClick={this.props.logout}>
            Log out
          </button>
        </div>
      );
    }
    else {
      return(
        this.sessionLinks()
      );
    }
  }

  render(){
    return(
      <div>
        {this.personalGreeting()}
      </div>
    );
  }
}

export default withRouter(Header);
