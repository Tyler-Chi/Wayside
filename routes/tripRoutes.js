const mongoose = require("mongoose");

const Trip = mongoose.model("trips");

module.exports = app => {
  app.get("/api/trips/all", async (req, res) => {
    //here, inside find, can specify which trips we want :D
    const trips = await Trip.find();
    console.log(trips);
    res.send(trips);
  });

  app.get("/api/trips/allUpcoming", async (req, res) => {
    const trips = await Trip.find({
      completed: false
    });
    res.send(trips);
  });

  app.get("/api/trips/completed", async (req, res) => {
    const trips = await Trip.find({
      completed: true,
      _user: req.user.id
    });

    res.send(trips);
  });

  app.get("/api/trips/:tripId", async (req, res) => {
    const trip = await Trip.findOne({ _id: req.params.tripId });
    res.send(trip);
  });

  app.get("/api/trips/upcoming", async (req, res) => {
    const trips = await Trip.find({
      completed: false,
      _user: req.user.id
    });
    res.send(trips);
  });

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
      completed,
      _user: req.user.id
    });

    trip.save();
  });
};
