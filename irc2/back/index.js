const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const messageRoute = require("./routes/messages");
const conversationRoute = require("./routes/conversations");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
//BDD
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/users", userRoute);


app.listen(process.env.PORT || 8080, () => {
  console.log("Backend server is running!");
});



