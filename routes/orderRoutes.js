const mongoose = require("mongoose");

const Order = mongoose.model("orders");

module.exports = app => {
  app.post("/api/orders", (req, res) => {
    console.log("i am in order routes :D");
    console.log("req", req);

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
  });
};
