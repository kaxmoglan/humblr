const functions = require("firebase-functions");
const app = require("express")();

const FBAuth = require("./util/fbAuth");
const {
  getAllMurmurs,
  postMurmur,
  getMurmur,
  commentOnMurmur,
} = require("./handlers/murmurs");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require("./handlers/users");

// MURMUR ROUTES
app.get("/murmurs", getAllMurmurs);
app.post("/murmur", FBAuth, postMurmur);
app.get("/murmur/:murmurId", getMurmur);
// TODO: delete murmur
// TODO: like murmur
// TODO: unlike murmur
app.post("/murmur/:murmurId/comment", FBAuth, commentOnMurmur);

// USERS ROUTES
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.region("europe-west1").https.onRequest(app);
