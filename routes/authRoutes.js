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
};
