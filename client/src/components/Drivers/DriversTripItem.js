import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
// import * as actions from "../../actions";
import './DriversTripItem.css';
import OrderItem from "./OrderItem";

let customStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
};

class DriversTripItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalISOpen: false,
      error: "",
      toggle: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.completeOrder = this.completeOrder.bind(this);
    this.update = this.update.bind(this);

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
      //here should show the total amount of money accepted from the ordersAccepted

      //TODO maybe turn this green, green = money.
      return (
        cashTotal

      );
    }
  }

  completeOrder() {
    //so all the orders that are accepted has to be deliveredStatus = true. Also the trip itself has to be completed = false
    const { trip } = this.props;
    let checkAllCompleted = this.ordersAccepted.every(order => order.deliveredStatus === true);

    if ((trip.completed === false) &&
        (checkAllCompleted === true)) {
      return (
        <button
          className="trip-button"
          onClick={()=> this.update(trip)
          }> Complete Trip
        </button>
      );
    }
  }

  update(trip) {
    this.props.updateTrip(trip._id, {completed: true});
    this.setState({ toggle: true });
    this.setState({ toggle: false });
  }

  render() {
    const { trip } = this.props;

    let tripStartDate = trip.tripStartDate.toString().slice(0, 10);
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

              {this.completeOrder()}

              <button className="trip-button" onClick={this.openModal}> See Trip Information </button>

            </div>
          </div>
        </div>
        <Modal
          className="trip-modal"
          style={customStyle}
          isOpen={this.state.modalISOpen}
          onClose={this.closeModal}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closeModal}>

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

            <div className="modal-trip-etc">
              <div className="column trip-etc-column">
                {this.variedTitle()}
                <h3 className="trip-price">{this.variedBody()}</h3>
              </div>

              <div className="column trip-etc-column">
                <h4>NUM. OF PACKAGES</h4>
                <h3 className="trip-packages">{this.ordersAccepted.length}</h3>
              </div>
            </div>

            <h2 className="packages-title">PACKAGES</h2>
            <ul className="modal-package-list">
              {
                this.ordersRequested.map(order => (
                  <OrderItem
                    order={order}
                    type={'requested'}
                    className="pending"
                    />
                ))
              }
              {
                this.ordersAccepted.map(order => (
                  <OrderItem
                    order={order}
                    type={'accepted'}
                    className="accepted"
                    />
                ))
              }
              {
                this.ordersRejected.map(order => (
                  <OrderItem
                    order={order}
                    type={'rejected'}
                    className="rejected"
                    />
                ))
              }
            </ul>
            <div className="modal-button-div">
              <button className="trip-button-modal" onClick={this.closeModal}> Close </button>
            </div>
          </div>

        </Modal>
      </div>
    );
  }
}

export default DriversTripItem;
