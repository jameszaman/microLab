const router = require("express").Router();

// Database
const { Reminder } = require("../database/database");

router.get("/new", (req, res) => {
  res.render("newReminder");
});

router.post("/new", (req, res) => {
  console.log(req.body);
  const reminderObject = {
    remindTime: req.body.reminderTime,
    reminderText: req.body.reminderText,
    reminderType: req.body.reminderType
  }
  if(req.body.reminderType == 'repeat') {
    reminderObject["reminderDays"] = req.body.reminderDays;
  }
  const reminder = new Reminder(reminderObject);
  reminder.save();
  res.redirect("/");
});

module.exports = router;
