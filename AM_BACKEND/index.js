const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const articleRoute = require('./router/articleRoute');



app.use(cors());
app.use(express.json());


app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/public")));
app.use("/upload", express.static("upload"));

app.use('/articles',articleRoute);

  mongoose.connect("mongodb://localhost:27017")
  .then(()=>console.log("MongoDB Connection Successful"))
  .catch((error)=>console.log("error",error))

app.listen(5000, (req, res) => {
  console.log("NodeJS Server Started");
});
