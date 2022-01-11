// All External module imports.
const express = require("express");

// The main object we will work with.
const app = express();

// requiring routers.
const baseRouter = require("./routes/baseRouter");
const reminderRouter = require("./routes/reminderRouter");

// Setting static folders.
app.use(express.static("public"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/images", express.static(__dirname + "/public/images"));
// Showing favicon.
app.use("/favicon.ico", express.static(__dirname + "/favicon.ico"));
app.set("view engine", "ejs");

// Using the routers to set up routes.
app.use("/", baseRouter);
app.use("/reminder", reminderRouter);

// Starting the server.
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running. 😁`);
});
