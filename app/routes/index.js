var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost/eat'
});

function restaurants() {
  return knex('restaurants');
}

router.get('/restaurants', function(req, res, next) {
  restaurants().select().then(function(result) {
    res.render('pages/index', {restaurants: result});
  })
});

router.get('/restaurants/new', function(req, res, next) {
  restaurants().select().then(function(result) {
    res.render('pages/new');
  })
});

module.exports = router;
