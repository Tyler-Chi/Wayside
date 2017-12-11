const express = require("express");
const mongoose = require("mongoose");

//cookieSession gives us access to coookies
const cookieSession = require("cookie-session");
//tells passport to make use of those cookies
const passport = require("passport");

const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

//models/User needs to be first, so that the schema is run!

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    //how long this cookie can live in the browser before it expires
    //needs to be in milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
