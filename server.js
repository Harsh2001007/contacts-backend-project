const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);
app.listen(port, () => {
  console.log("Server started on port ->", port);
});
