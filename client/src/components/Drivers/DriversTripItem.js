import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import * as actions from "../../actions";
import './DriversTripItem.css';


class DriversTripItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalISOpen: false,
      error: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(){
    this.setState({modalISOpen: true});
  }
  closeModal(){
    this.setState({modalISOpen: false});
  }


  render() {

    const { orders } = this.props;

    console.log('orders',orders);
    // console.log('DTI ORDERS',orders);

    const ordersRequested = orders.filter(order => order.requestPending)
    const ordersAccepted = orders.filter(order => order.accepted)

    console.log('ordersAccepted', ordersAccepted);
    console.log('ordersRequested',ordersRequested);

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
                <h4>PENDING REQUESTS</h4>
                <h3 className="trip-packages"> {ordersRequested.length} </h3>
              </div>

              <div className="column">
                <h4>PACKAGES</h4>
                <h3 className="trip-packages">{ordersAccepted.length}</h3>
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
                <h4>PENDING REQUESTS {ordersRequested.length} </h4>
                <h3 className="trip-requests"> {ordersRequested.length}</h3>
              </div>

              <div className="column">
                <h4>PACKAGES</h4>
                <h3 className="trip-packages">{ordersAccepted.length}</h3>
              </div>
            </div>

            <button className="trip-button" onClick={this.closeModal}> Close </button>
          </div>

        </Modal>
      </div>
    );
  }
}

export default DriversTripItem;
