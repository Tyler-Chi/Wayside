import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import * as actions from "../../actions";
import './DriversTripItem.css';
import OrderItem from "./OrderItem";


class DriversTripItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalISOpen: false,
      error: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    const { orders } = this.props;
    this.ordersRequested = orders.filter(order => order.requestPending);
    this.ordersAccepted = orders.filter(order => order.accepted);
    this.ordersRejected = orders.filter(order => (order.accepted === false && order.requestPending === false));

  }

  openModal(){
    this.setState({modalISOpen: true});
  }
  closeModal(){
    this.setState({modalISOpen: false});
  }

  // <h4>PENDING REQUESTS</h4>
  // <h3 className="trip-packages"> {ordersRequested.length} </h3>



  variedTitle(){
    if (this.props.type === "upcoming"){
      return (
        <h4> PENDING REQUESTS</h4>
      );
    } else { //goes here if the trip has been completed, so show money.
      return (
        <h4> MONEY EARNED </h4>
      );
    }
  }

  variedBody(){

    // const { orders } = this.props;
    // const ordersRequested = orders.filter(order => order.requestPending);
    // const ordersAccepted = orders.filter(order => order.accepted);

    if (this.props.type === "upcoming"){
      return (
        <h3 className="trip-packages"> {this.ordersRequested.length} </h3>
      );
    } else { //goes here if the trip has been completed, so show money.

      let cashTotal = 0;

      this.ordersAccepted.forEach(order => cashTotal += order.price)
      //here should show the total amount of mone accepted from the ordersAccepted

      //TODO maybe turn this green, green = money.
      return (
        cashTotal

      );
    }
  }

  render() {
    const { orders } = this.props;

    let trip = this.props.trip;
    let tripStartDate = this.props.trip.tripStartDate.toString().slice(0, 10);
    let tripEndDate = trip.tripEndDate.toString().slice(0, 10);

    return(
      <div>
        <div className="trip-item">

          <div className="trip-date">
            <div className="column trip-departure-div">
              <h4>DEPARTURE DATE</h4>
              <h3 className="trip-departure">  {tripStartDate}</h3>
            </div>

            <div className="column trip-arrival-div">
              <h4>ARRIVAL DATE:</h4>
              <h3 className="trip-arrival">  {tripEndDate}</h3>
            </div>
          </div>


          <div className="trip-item-bottom">
            <div className="column">
              <h4>STARTING LOCATION</h4>
              <h3 className="trip-start">{trip.origin}</h3>
            </div>

            <div className="column">
              <h4>DESTINATION</h4>
              <h3 className="trip-end"> {trip.destination}</h3>
            </div>

            <div className="trip-etc">
              <div className="column">
                {this.variedTitle()}
                <h3 className="trip-packages"> {this.variedBody()} </h3>
              </div>

              <div className="column">
                <h4>PACKAGES</h4>
                <h3 className="trip-packages">{this.ordersAccepted.length}</h3>
              </div>

              <button className="trip-button" onClick={this.openModal}> See Trip Information </button>

            </div>
          </div>
        </div>
        <Modal
          className="trip-modal"
          isOpen={this.state.modalISOpen}
          onClose={this.closeModal}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closeModal}>


          <h2>YOUR TRIP</h2>

          <div className="trip-date">
            <div className="column trip-departure-div">
              <h4>DEPARTURE DATE</h4>
              <h3 className="trip-departure">  {tripStartDate}</h3>
            </div>

            <div className="column trip-arrival-div">
              <h4>ARRIVAL DATE:</h4>
              <h3 className="trip-arrival">  {tripEndDate}</h3>
            </div>
          </div>


          <div className="trip-item-bottom">
            <div className="column">
              <h4>STARTING LOCATION</h4>
              <h3 className="trip-start">{trip.origin}</h3>
            </div>

            <div className="column">
              <h4>DESTINATION</h4>
              <h3 className="trip-end"> {trip.destination}</h3>
            </div>

            <div className="trip-etc">
              <div className="column">
                <h4>PENDING REQUESTS {this.ordersRequested.length} </h4>
                <h3 className="trip-requests"> {this.ordersRequested.length}</h3>
              </div>

              <div className="column">
                <h4>PACKAGES</h4>
                <h3 className="trip-packages">{this.ordersAccepted.length}</h3>
              </div>
            </div>

            <ul>
              {
                this.ordersRequested.map(order => (
                  <OrderItem
                    order={order}
                    type={'requested'}
                    />
                ))
              }
              {
                this.ordersAccepted.map(order => (
                  <OrderItem
                    order={order}
                    type={'accepted'}
                    />
                ))
              }
              {
                this.ordersRejected.map(order => (
                  <OrderItem
                    order={order}
                    type={'rejected'}
                    />
                ))
              }
            </ul>

            <button className="trip-button" onClick={this.closeModal}> Close </button>
          </div>

        </Modal>
      </div>
    );
  }
}

export default DriversTripItem;
