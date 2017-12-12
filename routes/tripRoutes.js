const mongoose = require("mongoose");

const Trip = mongoose.model("trips");

module.exports = app => {
  app.post("/api/trips", (req, res) => {
    //first check that the user is logged in, otherwise
    //they should not be able to make a trip
    //except the body of the request to hold the schema stuff.

    console.log("req body", req.body);

    // console.log("res1", res);

    const {
      origin,
      destination,
      tripStartDate,
      tripEndDate,
      completed
    } = req.body;

    const trip = new Trip({
      origin,
      destination,
      tripStartDate,
      tripEndDate,
      completed
    });

    trip.save();
  });
};
