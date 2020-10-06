const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello world!");
});

// GET ALL DOCS FROM DB
exports.getMurmurs = functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection("murmurs")
    .get()
    .then((data) => {
      let murmurs = [];
      data.forEach((doc) => {
        murmurs.push(doc.data());
      });
      return res.json(murmurs);
    })
    .catch((err) => console.error(err));
});

// CREATE DOCS
exports.createMurmur = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }
  const newMurmur = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
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
