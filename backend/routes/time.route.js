const express = require('express');
const app = express();
const timeRoute = express.Router();
const createError = require('http-errors');

// User model
let Time = require('../models/Time');

// Add time to database
timeRoute.route('/time/create').post((req, res, next) => {
  Time.create(req.body.time, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get All Times for User
timeRoute.route('/time/:user_id').get((req, res) => {
  Time.find({ user_id: req.params.user_id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});


module.exports = timeRoute;
