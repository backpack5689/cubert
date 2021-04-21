const express = require('express');
const app = express();
const userRoute = express.Router();

// User model
let User = require('../models/User');

// Add User
userRoute.route('/create').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// Get All Employees
userRoute.route('/').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// login
userRoute.route('/login').post((req, res, next) => {
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
