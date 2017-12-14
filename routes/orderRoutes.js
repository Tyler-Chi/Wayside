const mongoose = require("mongoose");

const Order = mongoose.model("orders");

module.exports = app => {
  //my request orders
  app.get("/api/orders", async (req, res) => {
    console.log("i am in the routes");
    const requestOrders = await Order.find({
      _ownerId: req.user.id
    });
    console.log("req orders", requestOrders);

    const deliverOrders = await Order.find({
      _driverId: req.user.id
    });

    const allOrders = requestOrders.concat(deliverOrders);

    let output = {};

    allOrders.forEach(order => {
      output[order._id] = order;
    });

    res.send(output);
  });

  //logic for accepting an order
  app.put("/api/orders/:orderId", (req, res) => {
    console.log("im trying to update an order :<");
    console.log("order update req", req.body);

    //editting the order...
    //at this point, the driver is already chosen.
    Order.findById(req.params.orderId, function(err, queryOrder) {
      queryOrder.accepted = req.body.accepted || queryOrder.accepted;
      queryOrder.requestPending =
        req.body.requestPending || queryOrder.requestPending;
      queryOrder.deliveredStatus =
        req.body.deliveredStatus || queryOrder.deliveredStatus;
      queryOrder.rating = req.body.rating || queryOrder.rating;
      queryOrder.comments = req.body.comments || queryOrder.comments;
    });

    //save it into the database, and return this. will merge it into the orders slice of state.
    queryOrder.save(function(saveErr, savedOrder) {
      return res.send(savedOrder);
    });
  });

  app.post("/api/orders", (req, res) => {
    console.log("i am in order routes :D");
    console.log("req", req.body);

    const {
      _driverId,
      _ownerId,
      accepted,
      deliveredBy,
      startLoc,
      endLoc,
      deliveredStatus,
      rating,
      price,
      comments,
      requestPending,
      _tripId
    } = req.body;

    const order = new Order({
      _driverId,
      _ownerId: req.user.id,
      accepted,
      deliveredBy,
      startLoc,
      endLoc,
      deliveredStatus,
      rating,
      price,
      comments,
      requestPending,
      _tripId
    });

    order.save();
    res.send(order);
  });
};
