const mongoose = require("mongoose");

const Trip = mongoose.model("trips");

module.exports = app => {
  app.get("/api/trips/all", async (req, res) => {
    //here, inside find, can specify which trips we want :D
    const trips = await Trip.find({
      _user: req.user.id
    });

    let output = {};

    trips.forEach(trip => {
      output[trip._id] = trip;
    });

    console.log("here i am", output);
    res.send(output);
  });

  app.get("/api/trips/allUpcoming", async (req, res) => {
    const trips = await Trip.find({
      completed: false
    });

    let output = {};

    trips.forEach(trip => {
      output[trip._id] = trip;
    });

    console.log("here i am", output);
    res.send(output);
  });

  app.get("/api/trips/completed", async (req, res) => {
    const trips = await Trip.find({
      completed: true,
      _user: req.user.id
    });

    let output = {};

    trips.forEach(trip => {
      output[trip._id] = trip;
    });

    console.log("here i am", output);
    res.send(output);
  });

  app.get("/api/trips/:tripId", async (req, res) => {
    const trip = await Trip.findOne({ _id: req.params.tripId });
    res.send(trip);
  });

  app.get("/api/trips/upcoming", async (req, res) => {
    console.log("i am in upcoming");
    const trips = await Trip.find({
      completed: false,
      _user: req.user.id
    });

    let output = {};

    trips.forEach(trip => {
      output[trip._id] = trip;
    });

    console.log("here i am", output);
    res.send(output);
  });

  app.put("/api/trips/:tripId", async (req, res) => {
    console.log("params", req.params);
    console.log("body", req.body.completed);

    const queryTrip = await Trip.findById(req.params.tripId);

    //this is kind of buggy ><, need to specify

    //maybe i can use object.assign....?

    Object.assign(queryTrip, req.body);

    console.log(queryTrip.completed);

    queryTrip.save(function(saveErr, savedTrip) {
      return res.send(savedTrip);
    });
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
      completed,
      latO,
      lngO,
      latD,
      lngD,
      tripDistance,
      price,
      orders,
      tripNewDistance,
    } = req.body;

    const trip = new Trip({
      origin,
      destination,
      tripStartDate,
      tripEndDate,
      completed,
      tripDistance,
      latO,
      lngO,
      latD,
      lngD,
      price,
      orders,
      tripNewDistance,
      _user: req.user.id,
      userObject: req.user
    });

    trip.save();

    res.send(trip);
  });
};
