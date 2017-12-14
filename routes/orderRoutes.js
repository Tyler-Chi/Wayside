const mongoose = require("mongoose");

const Order = mongoose.model("orders");
const Trip = mongoose.model("trips");
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
  app.put("/api/orders/:orderId", async (req, res) => {
    console.log("im trying to update an order :<");
    console.log("order update req", req.body);

    //editting the order...
    //at this point, the driver is already chosen.

    const queryOrder = await Order.findById(req.params.orderId);

    Object.assign(queryOrder, req.body);

    console.log(queryOrder.rating);
    //save it into the database, and return this. will merge it into the orders slice of state.
    queryOrder.save(function(saveErr, savedOrder) {
      return res.send(savedOrder);
    });
  });

  app.post("/api/orders", async (req, res) => {
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
    //save posts it into the data base
    order.save();

    //now I want to push it into the corresponding trip's array of orders. the trip will only have ID's, with these ID's, we will access the orders held inside the state.

    console.log("i am in the order routes, here is the trip");
    const trip = await Trip.findById(order._tripId);
    console.log(trip);

    trip.orders.push(order._id);

    trip.save();

    res.send(order);
  });
};
