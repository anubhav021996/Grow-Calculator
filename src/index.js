const express = require("express");
const app = express();
const cors = require("cors");

const connect = require("./configs/db");
const userController = require("./controllers/user.controller");

app.use(cors());
app.use(express.json());

app.use("/", userController);

let port = process.env.PORT || 2548;
app.listen(port, async () => {
  try {
    await connect();
    console.log("Listening");
  } catch (e) {
    console.log(e.message);
  }
});
