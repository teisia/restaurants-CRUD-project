var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


// show restaurants homepage
router.get('/', function(req, res) {
  res.render('pages/neighborhoods');
});

module.exports = router;
