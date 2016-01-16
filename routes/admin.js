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
  restaurants().select().then(function(result) {
    res.render('pages/admin', {restaurants: result});
  })
});

module.exports = router;
