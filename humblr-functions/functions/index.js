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

// TRIGGER NOTIFICATION ON LIKE
exports.createNotificationOnLike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/murmurs/${snapshot.data().murmurId}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().username !== snapshot.data().username) {
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

// TRIGGER NOTIFICATION ON COMMENT
exports.createNotificationOnComment = functions
  .region("europe-west1")
  .firestore.document("comments/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/murmurs/${snapshot.data().murmurId}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().username !== snapshot.data().username) {
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

// TRIGGER PROFILE IMAGE CHANGE ON COMMENTS
exports.onUserImageChange = functions
  .region("europe-west1")
  .firestore.document("/users/{userId}")
  .onUpdate((change) => {
    console.log(change.before.data());
    console.log(change.after.data());
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      console.log("image has changed");
      const batch = db.batch();
      return db
        .collection("murmurs")
        .where("username", "==", change.before.data().username)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const murmur = db.doc(`/murmurs/${doc.id}`);
            batch.update(murmur, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else return true;
  });

// TRIGGER LIKES & COMMENTS DELETION ON MURMUR DELETE
exports.onMurmurDelete = functions
  .region("europe-west1")
  .firestore.document("/murmurs/{murmurId}")
  .onDelete((snapshot, context) => {
    const murmurId = context.params.murmurId;
    const batch = db.batch();
    return db
      .collection("comments")
      .where("murmurId", "==", murmurId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection("likes").where("murmurId", "==", murmurId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection("notifications")
          .where("murmurId", "==", murmurId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => console.error(err));
  });
