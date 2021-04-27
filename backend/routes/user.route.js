const express = require('express');
const app = express();
const userRoute = express.Router();

// User model
let User = require('../models/User');

// Add User
userRoute.route('/user/create').post((req, res, next) => {
  User.create({ user_email: req.body.username, user_fname: req.body.firstname, user_lname: req.body.lastname, user_password: req.body.hashword, user_roomcode: -1, user_friendid: "", user_statbest: "", user_statbesto5: "" }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// Get All Employees
userRoute.route('/user/').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// login
userRoute.route('/user/login').post((req, res, next) => {
  User.find({ user_email: req.body.username }, (error, data) => {
    if (error) {
      return next(error)
    } else {
	  if (data[0] === undefined)
	  {
		  res.json({_id: -2});
	  }
	  else
	  {
		if(req.body.hashword == data[0].user_password)
        {
		  res.json({_id: data[0]._id});
        } else {
          res.json({_id: -1});
        }  
	  }
    }
  })
});




module.exports = userRoute;
