const { db } = require("../util/admin");

exports.getAllMurmurs = (req, res) => {
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
};

exports.postMurmur = (req, res) => {
  const newMurmur = {
    body: req.body.body,
    username: req.user.username,
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
};

// GET ONE MURMUR
exports.getMurmur = (req, res) => {
  let murmurData = {};

  db.doc(`/murmurs/${req.params.murmurId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Murmur not found" });
      }
      murmurData = doc.data();
      murmurData.murmurId = doc.id;
      return db
        .collection("comments")
        .orderBy("createdAt", "desc")
        .where("murmurId", "==", req.params.murmurId)
        .get();
    })
    .then((data) => {
      murmurData.comments = [];
      data.forEach((doc) => {
        murmurData.comments.push(doc.data());
      });
      return res.json(murmurData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// COMMENT ON A MURMUR
exports.commentOnMurmur = (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ error: "Must not be empty" });
  }

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    murmurId: req.params.murmurId,
    username: req.user.username,
    userImage: req.user.imageUrl,
  };

  db.doc(`/murmurs/${req.params.murmurId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Murmur not found " });
      }

      return db.collection("comments").add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
};
