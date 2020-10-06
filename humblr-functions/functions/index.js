const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const express = require("express");
const app = express();

// GET ALL DOCS FROM DB
app.get("/murmurs", (req, res) => {
  admin
    .firestore()
    .collection("murmurs")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let murmurs = [];
      data.forEach((doc) => {
        murmurs.push({
          murmurId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(murmurs);
    })
    .catch((err) => console.error(err));
});

// CREATE DOCS
app.post("/murmur", (req, res) => {
  const newMurmur = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };

  admin
    .firestore()
    .collection("murmurs")
    .add(newMurmur)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});

exports.api = functions.region("europe-west1").https.onRequest(app);
