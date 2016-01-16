var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function restaurants() {
  return knex('restaurants');
};

function employees() {
  return knex('employees');
};

function reviews() {
  return knex('review');
};

router.get('/', function(req, res, next) {
    res.redirect('/restaurants');
});

module.exports = router;
