//keys.js - figure out what set of credentials to return.

if (process.env.NODE_ENV === "production") {
  //we are in production, return the prod set of keys
  module.exports = require("./prod");
} else {
  //we are in development, return the dev keys.
  module.exports = require("./dev");
}

//the mongoURI comes from the database: flexpROJECT ON MLAB.

//look at "to connect using a driver via the standard MongoDB URI.
// mongodb://<dbuser>:<dbpassword>@ds133876.mlab.com:33876/flexproject

//replace the dbuser with the username, which is fpuser
//replace the dbpassword with the password, which is fpppassword
