import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import * as actions from "../../actions";
import './CustomersOrdersNewItem.css';

class CustomersOrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalISOpen: false,
      error: "",
      ratingSet: false,
      star1: false,
      star2: false,
      star3: false,
      star4: false,
      star5: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.requested = this.requested.bind(this);
    this.deliveredStatus = this.deliveredStatus.bind(this);
    this.handleRatings = this.handleRatings.bind(this);
    this.handleRatingsColor1 = this.handleRatingsColor1.bind(this);
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

  handleRatings(string){
    // console.log(event.target);
    // e.currentTarget.style.color = "yellow";
    // this.setState({ratingSet: true});
    // console.log(document.getElementsByClassName(`${string}`));
    if (string === "star1"){
      this.setState({
        star1: true,
        star2: false,
        star3: false,
        star4: false,
        star5: false});
    } else if (string === "star2"){
      this.setState({
        star1: true,
        star2: true,
        star3: false,
        star4: false,
        star5: false});
    } else if (string === "star3"){
      this.setState({
        star1: true,
        star2: true,
        star3: true,
        star4: false,
        star5: false});
    } else if (string === "star4"){
      this.setState({
        star1: true,
        star2: true,
        star3: true,
        star4: true,
        star5: false});
    } else if (string === "star5"){
      this.setState({
        star1: true,
        star2: true,
        star3: true,
        star4: true,
        star5: true});
    }
  }
  handleRatingsColor1(){
    if (this.state.star1) {
      return "star1as";
    } else {
      return "";
    }
  }
  handleRatingsColor2(){
    if (this.state.star2) {
      return "star2as";
    } else {
      return "";
    }
  }
  handleRatingsColor3(){
    if (this.state.star3) {
      return "star3as";
    } else {
      return "";
    }
  }
  handleRatingsColor4(){
    if (this.state.star4) {
      return "star4as";
    } else {
      return "";
    }
  }
  handleRatingsColor5(){
    if (this.state.star5) {
      return "star5as";
    } else {
      return "";
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
                  <i id={this.handleRatingsColor5()} className="fa fa-star star5 star5a" onClick={()=>this.handleRatings("star5")} aria-hidden="true"></i>
                  <i id={this.handleRatingsColor4()} className="fa fa-star star4 star4a star5a" onClick={()=> this.handleRatings("star4")} aria-hidden="true"></i>
                  <i id={this.handleRatingsColor3()} className="fa fa-star star3 star3a star4a star5a" onClick={()=>this.handleRatings("star3")} aria-hidden="true"></i>
                  <i id={this.handleRatingsColor2()} className="fa fa-star star2 star2a star3a star4a star5a"  onClick={()=>this.handleRatings("star2")} aria-hidden="true"></i>
                  <i id={this.handleRatingsColor1()} className="fa fa-star star1 star2 star2a star3a star4a star5a" onClick={()=>this.handleRatings("star1")} aria-hidden="true"></i>
                </div>



              </div>
            </div>

        </div>
      </div>
    );
  }
}

export default CustomersOrderItem;
