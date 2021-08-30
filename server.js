const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log("Listening to port " + PORT);
});
