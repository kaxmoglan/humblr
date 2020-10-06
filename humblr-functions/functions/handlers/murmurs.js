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
