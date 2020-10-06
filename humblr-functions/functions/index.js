const functions = require("firebase-functions");
const app = require("express")();

const FBAuth = require("./util/fbAuth");
const { getAllMurmurs, postMurmur } = require("./handlers/murmurs");
const { signup, login } = require("./handlers/users");

// MURMUR ROUTES
app.get("/murmurs", getAllMurmurs);
app.post("/murmur", FBAuth, postMurmur);

// SIGNUP ROUTE
app.post("/signup", signup);

// LOGIN ROUTE
app.post("/login", login);

exports.api = functions.region("europe-west1").https.onRequest(app);
