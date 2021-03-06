var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var validate = require('../lib/validations');

function restaurants() {
  return knex('restaurants');
};

function employees() {
  return knex('employees');
};

// show add new employee page
router.get('/:id/employees/new', function(req, res) {
  restaurants().where('id', req.params.id).first().then(function(result) {
    res.render('pages/new-employee', {restaurants: result});
  })
});

// post new employee with validations
router.post('/:id/employees', function(req, res) {
  var newEmployee = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    position: req.body.position,
    restaurants_id: req.params.id
};
  var errors=[];
  errors.push(validate.firstNameIsNotBlank(req.body.first_name));
  errors.push(validate.lastNameIsNotBlank(req.body.last_name));
    errors = errors.filter(function(error) {
      return error.length;
    })
      if (errors.length) {
      restaurants().select().first().then(function(result) {
        employees().select().then(function(result2) {
        res.render('pages/new-employee', {errors: errors, restaurants: result, employees: result2})
          })
        })
      } else {
      employees().insert(newEmployee).then(function(result) {
        res.redirect('/restaurants/'+req.params.id);
    })
  }
});

// show edit employee page
router.get('/:id/employees/:empid/edit', function(req, res, next) {
  restaurants().where('id', req.params.id).first().then(function(result){
    employees().where('id', req.params.empid).first().then(function(result2){
    res.render('pages/edit-employee', {restaurants: result, employees: result2});
    })
  })
});

// post edited employee
router.post('/:id/employees/:empid', function(req, res){
 var items = {
   first_name: req.body.first_name,
   last_name: req.body.last_name,
   position: req.body.position,
   restaurants_id: req.params.id
 }
 employees().where('id', req.params.empid).update(items).then(function(result){
     res.redirect('/restaurants/'+req.params.id);
   })
});

// delete employee
router.get('/:id/employees/:empid/delete', function(req, res, next) {
  employees().where('id', req.params.empid).del().then(function(result){
    res.redirect('/restaurants/'+req.params.id);
  })
});

module.exports = router;
