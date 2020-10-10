const { db } = require("../util/admin");

// GET ALL MURMURS
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

// POST A MURMUR
exports.postMurmur = (req, res) => {
  const newMurmur = {
    body: req.body.body,
    username: req.user.username,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  };

  db.collection("murmurs")
    .add(newMurmur)
    .then((doc) => {
      const resMurmur = newMurmur;
      resMurmur.murmurId = doc.id;
      res.json(resMurmur);
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
    return res.status(400).json({ comment: "Must not be empty" });
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
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
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

// LIKE MURMUR
exports.likeMurmur = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("username", "==", req.user.username)
    .where("murmurId", "==", req.params.murmurId)
    .limit(1);

  const murmurDocument = db.doc(`/murmurs/${req.params.murmurId}`);

  let murmurData;

  murmurDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        murmurData = doc.data();
        murmurData.murmurId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Murmur not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            murmurId: req.params.murmurId,
            username: req.user.username,
          })
          .then(() => {
            murmurData.likeCount++;
            return murmurDocument.update({ likeCount: murmurData.likeCount });
          })
          .then(() => {
            return res.json(murmurData);
          });
      } else {
        return res.status(400).json({ error: "Murmur already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// UNLIKE MURMUR
exports.unlikeMurmur = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("username", "==", req.user.username)
    .where("murmurId", "==", req.params.murmurId)
    .limit(1);

  const murmurDocument = db.doc(`/murmurs/${req.params.murmurId}`);

  let murmurData;

  murmurDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        murmurData = doc.data();
        murmurData.murmurId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Murmur not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Murmur not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            murmurData.likeCount--;
            return murmurDocument.update({ likeCount: murmurData.likeCount });
          })
          .then(() => {
            res.json(murmurData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// DELETE MURMUR
exports.deleteMurmur = (req, res) => {
  const document = db.doc(`/murmurs/${req.params.murmurId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Murmur not found" });
      }
      if (doc.data().username !== req.user.username) {
        return res.status(403).json({ error: "Unauthorised" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Scream deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
