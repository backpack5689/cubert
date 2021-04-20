const express = require('express');
const app = express();
const userRoute = express.Router();

// User model
let User = require('../models/User');

// Add User
userRoute.route('/create').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Employees
userRoute.route('/').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// login
userRoute.route('/login').post() => {


});




module.exports = userRoute;
