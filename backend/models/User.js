const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
   user_fname: {
      type: String
   },
   user_lname: {
      type: String
   },
   user_displayname: {
      type: String
   },
   user_email: {
      type: String
   },
   user_password: {
      type: String
   },
   user_roomcode: {
      type: Number
   },
   user_friendid: {
      type: String
   },
   user_statbest: {
      type: String
   },
   user_statbesto5: {
      type: String
   },
}, {
   collection: 'user'
})

module.exports = mongoose.model('User', User)