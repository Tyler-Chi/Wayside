const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  //at this point, the url has a code!
  //now, because the code is there, passport knows the code is there and will use it!
  app.get("/auth/google/callback", passport.authenticate("google"));

  //if the user makes a get request to /api/logout, we want to execute the following callback.
  app.get("/api/logout", (req, res) => {
    //logout is a function automatically attached to req by passport.
    //this kills the cookie.
    req.logout();

    //req.user snould now be undefined.
    res.send(req.user);
  });

  //whenever someone makes a get request to app...
  //req is request, res is response

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
