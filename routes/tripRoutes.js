const mongoose = require("mongoose");

const Trip = mongoose.model("trips");

module.exports = app => {
  app.post("/api/trips", async (req, res) => {
    //first check that the user is logged in, otherwise
    //they should not be able to make a trip
    //except the body of the request to hold the schema stuff.
    const { startLoc, endLoc, startDate, endDate, completed } = req.body;

    const survey = new Survey({
      startLoc,
      endLoc,
      startDate,
      endDate,
      completed,
      _user: req.user.id
    });

    survey.save();
  });
};
