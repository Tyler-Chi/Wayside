import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// Pass in as props
// pendingOrders <= array of orders objects
// pending requests count <= an integer


class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.handlePendingRequests = this.handlePendingRequests.bind(this);
    this.state = {
      pendingDivActive: false,
    };
  }

// Links on the top right differ depending on if they're Drivers or Customers

  handlePendingRequests(pendingOrders){
    let currentState = this.state.pendingDivActive;
    this.setState({pendingDivActive: !currentState});
  }


  sessionLinks(){
    if (this.props.formType === "customer"){
      return(
        <nav className="customer-nav">
          <div
            className={this.state.pendingDivActive ? "customer-pending-orders-active" : "customer-pending-orders-inactive"}
            onClick={this.handlePendingRequests(this.props.pendingOrders)}>
            // !!!!! make a pending_request_count and pass it as a prop111
            Pending Request `${this.props.pending_request_count}`

            <ul className="customer-pending-orders-index">
              // this.props.pendingOrders.map({})
                <li>

                </li>
            </ul>
          </div>

          <Link className="customer-nav-past-orders" to="/orders/past">

          </Link>
        </nav>
      );
    }
    else {
      return(
        <nav className="login-signup">
          <Link className="login-signup-link" to="/login">Log in</Link>
        </nav>
      );
    }
  }

  personalGreeting(){

    let currentUser = this.props.currentUser;
    if (currentUser){
      return(
        <div className="header-group">
          <button onClick={()=> this.props.history.push('/explore')}>
            <i className="fa fa-map" aria-hidden="true"></i>
          </button>
          <button>
            <i className="fa fa-magic" aria-hidden="true"></i>
          </button>
          <button onClick={()=> this.props.history.push(`/user/${currentUser.username}`)}>
            <i className="fa fa-user-o" aria-hidden="true"></i>
          </button>
          <button className="header-button" onClick={this.props.logout}>
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

export default withRouter(Greeting);
