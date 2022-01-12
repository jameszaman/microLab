// imports
const mongoose = require("mongoose");
require("dotenv").config(); // Getting all the environment variables.

// Database connection
mongoose.connect(
  `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@main-shard-00-00.pd3ns.mongodb.net:27017,main-shard-00-01.pd3ns.mongodb.net:27017,main-shard-00-02.pd3ns.mongodb.net:27017/reminder?ssl=true&replicaSet=atlas-ly6s4r-shard-0&authSource=admin&retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection ERROR :(:"));
db.once("open", function () {
  console.log("Database connected");
});

const reminderSchema = new mongoose.Schema({
  setTime: {
    type: Date,
    default: Date.now
  },
  remindTime: {
    type: Date,
    required: true
  },
  reminderText: {
    type: String,
    required: true
  },
  reminderType: {
    type: String,
    required: true,
  },
  reminderDays: {
    type: [String],
  }
});

module.exports.Reminder = mongoose.model('reminder', reminderSchema);
