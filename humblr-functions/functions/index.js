const functions = require("firebase-functions");
const app = require("express")();

const admin = require("firebase-admin");
admin.initializeApp();

// FIREBASE SDK CONFIGURATION
const config = {
  apiKey: "AIzaSyA1qb7Va2zEztxD4NvAM3R68lnSlTB1nXQ",
  authDomain: "humblr-sm.firebaseapp.com",
  databaseURL: "https://humblr-sm.firebaseio.com",
  projectId: "humblr-sm",
  storageBucket: "humblr-sm.appspot.com",
  messagingSenderId: "586973775624",
  appId: "1:586973775624:web:d0f94848f5d29939e94ebd",
  measurementId: "G-9QBCE4SQRD",
};
const firebase = require("firebase");
firebase.initializeApp(config);
const db = admin.firestore();

// GET ALL MURMUR DOCS FROM DB
app.get("/murmurs", (req, res) => {
  db.collection("murmurs")
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

// CREATE MURMUR DOCS
app.post("/murmur", (req, res) => {
  const newMurmur = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };

  db.collection("murmurs")
    .add(newMurmur)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});

// Helper methods
const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};
const isEmail = (email) => {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regExp)) return true;
  else return false;
};

// SIGNUP ROUTE
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  // Validation
  let errors = {};

  if (isEmpty(newUser.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(newUser.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(newUser.password)) {
    errors.password = "Must not be empty";
  }
  if (newUser.password !== newUser.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }
  if (isEmpty(newUser.handle)) {
    errors.handle = "Must not be empty";
  }

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  // Validation passed
  let token, userId;

  db.doc(`/users/${newUser.handle}`)
    // Check user exists
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "This handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    // Asign user uid to userId & generate IdToken
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      // Asign IdToken to token | create db doc in users collection
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      // Success
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

// LOGIN ROUTE
app.post("/login", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  // Validation
  let errors = {};

  if (isEmpty(user.email)) {
    errors.email = "Must not be empty";
  }
  if (isEmpty(user.password)) {
    errors.password = "Must not be empty";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  // Validation passed
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        return res
          .status(403)
          .json({ general: "Incorrect password, please try again" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

exports.api = functions.region("europe-west1").https.onRequest(app);
