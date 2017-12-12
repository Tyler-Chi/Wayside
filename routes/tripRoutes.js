const mongoose = require("mongoose");

const Trip = mongoose.model("trips");

module.exports = app => {
  app.post("/api/trips", (req, res) => {
    //first check that the user is logged in, otherwise
    //they should not be able to make a trip
    //except the body of the request to hold the schema stuff.

    console.log(req.body);

    // console.log("res1", res);

    const { startLoc, endLoc, startDate, endDate, completed } = req.body;

    const trip = new Trip({
      startLoc,
      endLoc,
      startDate,
      endDate,
      completed
    });

    trip.save();
  });
};
