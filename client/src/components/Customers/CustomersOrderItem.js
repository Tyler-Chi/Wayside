import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import * as actions from "../../actions";
import './CustomersOrderItem.css';

class CustomersOrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalISOpen: false,
      error: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.requested = this.requested.bind(this);
    this.deliveredStatus = this.deliveredStatus.bind(this);
  }

  openModal(){
    this.setState({modalISOpen: true});
  }
  closeModal(){
    this.setState({modalISOpen: false});
  }

  requested(order){
    if (order.requestPending){
      return "Pending";
    } else if (order.accepted) {
      return "Accepted";
    } else {
      return "Rejected";
    }
  }

  deliveredStatus(order){
    if (order.deliveredStatus) {
      return "Delivered";
    } else {
      return "Not Delivered";
    }
  }

  render(){
    let order = this.props.order;
    let orderDeliverBy = this.props.order.deliveredBy.toString().slice(0, 10);
    return (
      <div>
        <div className="order-item">
          <div className="order-date">
            <div className="column order-deliverby">
              <h4>DELIVERY BY</h4>
              <h3 className="order-deliverby">{orderDeliverBy}</h3>
            </div>
          </div>

            <div className="order-item-bottom">
              <div className="column">
                <h4>PICK UP LOCATION</h4>
                <h3 className="order-startLoc">{order.startLoc}</h3>
              </div>
              <div className="column">
                <h4>DROP OFF LOCATION</h4>
                <h3 className="order-endLoc">{order.endLoc}</h3>
              </div>

              <div className="order-etc">
                <div className="column">
                  <h4 className="request">REQUEST</h4>
                  <h3 className="order-request request">{this.requested(order)}</h3>
                </div>
                <div className="column">
                  <h4>STATUS</h4>
                  <h3 className="order-status">{this.deliveredStatus(order)}</h3>
                </div>
                <div className="column price">
                  <h4 className="price">PRICE</h4>
                  <h3 className="order-price price">${order.price}</h3>
                </div>
              </div>
              <div className="driver-row row">
                <img className="driver-img" alt="user-img" src={order.tripObject.userObject.imageUrl}/>
                <div className="column order-driver-col">
                  <h4>DRIVER</h4>
                  <h3 className="order-driver">
                    {order.tripObject.userObject.name}
                  </h3>
                </div>


                <div className="driver-rating">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                </div>



              </div>
            </div>

        </div>
      </div>
    );
  }
}

export default CustomersOrderItem;
