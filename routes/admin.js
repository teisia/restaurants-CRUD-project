var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var auth = require('./auth');
var bcrypt = require('bcrypt');

function restaurants() {
  return knex('restaurants');
}

function users() {
  return knex('users');
}

router.get('/', function(req, res, next) {
  res.render('pages/admin');
});

function users() {
  return knex('users');
}

router.get('/', function(req, res, next) {
  if (req.cookies.user) {
    res.redirect('/admin/logged-in')
  } else {
    res.render('pages/admin');
  }
});

router.get('/sign-up', function(req, res, next) {
  res.cookie('user', req.body.username)
  res.cookie('password', req.body.password)
  res.render('pages/signup')
});

router.post('/', function(req, res, next) {
  var crypted = bcrypt.hashSync(req.body.password, 8);
  users().insert({username: req.body.username, password: crypted}).then(function(val){
  res.cookie('user', req.body.username)
  res.redirect('/admin/logged-in');
  })
});

router.post('/login', function(req, res, next) {
  users().where({username: req.body.username}).first().then(function(found) {
    if (found) {
      if (bcrypt.compareSync(req.body.password, found.password)) {
        res.cookie('user', req.body.username)
        res.redirect('/admin/logged-in');
      } else {
        res.redirect('/admin/invalid-user');
      }
      } else {
        res.redirect('/admin/invalid-user');
    }
  })
})

router.get('/logged-in', function(req, res, next) {
  restaurants().select().then(function(result) {
    res.render('pages/admin-show', {restaurants: result});
  })
});

router.get('/log-out', function(req, res, next) {
  res.clearCookie('user')
  res.clearCookie('password')
  res.render('pages/admin', {notice: 'You have been signed out'})
});

router.get('/invalid-user', function(req, res, next) {
  res.render('pages/no')
})

module.exports = router;
