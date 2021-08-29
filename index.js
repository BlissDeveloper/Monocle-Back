const express = require("express");
const app = express();
const router = express.Router();
const routes = require("./routes/routes");
require("dotenv").config();

const PORT = process.env.PORT;

//Middlewares
app.use(express.json());

//Routes
app.use("/api/v1", routes);

app.listen(process.env.PORT, () => {
  console.log("Listening to port " + PORT);
});
