const { db } = require("../util/admin");
const config = require("../util/config");
const { validateSignUp, validateLogin } = require("../util/validators");
const firebase = require("firebase");
firebase.initializeApp(config);

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
  };

  // Validation
  const { valid, errors } = validateSignUp(newUser);
  if (!valid) return res.status(400).json({ errors });

  // Validation passed
  let token, userId;

  db.doc(`/users/${newUser.username}`)
    // Check user exists
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ username: "This username is already taken" });
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
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.username}`).set(userCredentials);
    })
    .then(() => res.status(201).json({ token }))
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  // Validation
  const { valid, errors } = validateLogin(user);
  if (!valid) return res.status(400).json({ errors });

  // Validation passed
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => data.user.getIdToken())
    .then((token) => res.json({ token }))
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
};
