const express = require('express');
const app = express();
const userRoute = express.Router();
const createError = require('http-errors');


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
  });
});

// Get All Employees
userRoute.route('/user/').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

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
  });
});


// Get All Friends for User
userRoute.route('/user/friends/:user_id').get((req, res) => {
  User.find({ _id: req.params.user_id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      if (data[0].user_friendid == "") {
          res.json(null);
          return
      }
      
      var strFriends = data[0].user_friendid.split(",");
      var friendQuery = [];
      
      var i;
      for (i = 0; i < strFriends.length; i++) {
          friendQuery.push({ _id: strFriends[i] });
      }
      
      User.find({$or: friendQuery}, (err, dat) => {
          res.json(dat);
      });
    }
  });
});

// Find a User
userRoute.route('/user/find/:user_fname').get((req, res) => {
  User.find({ user_fname: req.params.user_fname }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Add a friend
 userRoute.route('/user/friends/add').post((req, res) => {
   User.find({_id: req.body.user_id}, (error, placeholder) => {
     if (error) {
       return next(error);
     } else {
         console.log(placeholder[0].user_friendid);
       if(placeholder[0].user_friendid != null)
       {
           if (placeholder[0].user_friendid != "") {
               req.body.friend_id += ",";
           }
           req.body.friend_id += placeholder[0].user_friendid;
       }
        User.updateOne({ _id: req.body.user_id }, { $set: { user_friendid: req.body.friend_id }}, (error, data) => {
         if (error){
           return next(error);
         } else {
           res.json(data);
         }
       });
     }
   });
 });

module.exports = userRoute;
