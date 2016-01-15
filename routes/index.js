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

router.get('/admin', function(req, res, next) {
  restaurants().select().then(function(result1) {
    employees().select().then(function(result2) {
      res.render('pages/admin', {restaurants: result1, employees: result2})
    })
  })
})

module.exports = router;
