const express = require("express");
const cors = require("cors");
const { User, Instruments, Musics } = require("./config");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/getInstrument/:id", async (req, res) => {
  var docRef = Instruments.doc(req.params.id);

  await docRef.get().then((doc) => {
      if (doc.exists) {
        res.send(doc.data());
      } else {
        res.send(404);
      }
  }).catch((error) => {
      res.send(403);
  });
});

app.get("/getMusics", async (req, res) => {
  var list = [];
  const snapshot = await Musics.get();

  snapshot.forEach((doc) => {
    list.push({id: doc.id, ...doc.data()});
  })

  res.send(list);
});

app.post('/register', (req, res) => {

  res.send({
      message: `hello ${req.body.email}!`
  })
})

app.post("/create", async (req, res) => {
  const data = req.body;
  await User.add({ data });
  res.send({ msg: "User Added" });
});

app.post("/update", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await User.doc(id).update(data);
  res.send({ msg: "Updated" });
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  await User.doc(id).delete();
  res.send({ msg: "Deleted" });
});

app.listen(process.env.PORT || 8081);
