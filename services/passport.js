const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

//the user here is the user record that we JUST pulled out of the database.
//it is the existingUser/user from the passport.use below.

passport.serializeUser((user, done) => {
  done(null, user.id);
});

//takes the id, turns it back into the user object(record)
passport.deserializeUser((id, done) => {
  //pass in the id of the record into this function
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {

      //first, we need to check if the googleId exists in the record though
      //this query returns a promise.
      //this query searchs based on the argument. logic:
      //check to see if existingUser exists (record with that googleId)
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        //we have someone with that given profile ID
        //first argument of done is errors u wanna show
        //returns the second argument
        return done(null, existingUser);
      }
      //we don't have a user record with that ID
      //creating a new user. right now, the schema specifies that users have
      //a googleId. here, we are setting it to profile.id
      //we got profile.id from the response from the google server
      const user = await new User({
        googleId: profile.id,
        name: profile.displayName,
        imageUrl: profile.photos[0].value
      }).save();
      done(null, user);
      //new User does not actually save the user, just creates it in the javascript.
      //this is why we need .save();
    }
  )
);
