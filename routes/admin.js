var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var authChecker = require('../lib/authChecker')

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
  res.render('pages/admin');
});

router.post('/', function(req, res) {
  res.cookie('user', req.body.username)
  res.cookie('password', req.body.password)
  res.redirect('/admin/logged-in');
});

router.use(authChecker.loginChecker);

router.get('/logged-in', function(req, res, next) {
  restaurants().select().then(function(result) {
    res.render('pages/admin-show', {restaurants: result});
  })
});

router.get('/log-out', function(req, res) {
  res.clearCookie('user')
  res.clearCookie('password')
  res.redirect('/restaurants')
});

module.exports = router;
