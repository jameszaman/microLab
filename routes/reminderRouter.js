const router = require('express').Router();

// Database
const { Reminder } = require('../database/database');

router.get('/new', (req, res) => {
  res.render('newReminder');
});


module.exports = router;
