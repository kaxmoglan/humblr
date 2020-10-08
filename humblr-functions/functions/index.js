const functions = require("firebase-functions");
const app = require("express")();

const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");

const {
  getAllMurmurs,
  postMurmur,
  getMurmur,
  commentOnMurmur,
  likeMurmur,
  unlikeMurmur,
  deleteMurmur,
} = require("./handlers/murmurs");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
} = require("./handlers/users");

// MURMUR ROUTES
app.get("/murmurs", getAllMurmurs);
app.post("/murmur", FBAuth, postMurmur);
app.get("/murmur/:murmurId", getMurmur);
app.delete("/murmur/:murmurId", FBAuth, deleteMurmur);
app.get("/murmur/:murmurId/like", FBAuth, likeMurmur);
app.get("/murmur/:murmurId/unlike", FBAuth, unlikeMurmur);
app.post("/murmur/:murmurId/comment", FBAuth, commentOnMurmur);

// USERS ROUTES
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:username", getUserDetails);
app.post("/notifications", FBAuth, markNotificationsRead);

// FIREBASE FUNCTIONS

exports.api = functions.region("europe-west1").https.onRequest(app);

// LIKE NOTIFICATIONS
exports.createNotificationOnLike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/murmurs/${snapshot.data().murmurId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().username,
            sender: snapshot.data().username,
            type: "like",
            read: false,
            murmurId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

// REMOVE LIKE NOTIFICATION ON UNLIKE
exports.deleteNotificationOnUnlike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onDelete((snapshot) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch((err) => {
        console.error(err);
        return;
      });
  });

// COMMENT NOTIFICATIONS
exports.createNotificationOnComment = functions
  .region("europe-west1")
  .firestore.document("comments/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/murmurs/${snapshot.data().murmurId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().username,
            sender: snapshot.data().username,
            type: "comment",
            read: false,
            murmurId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });
