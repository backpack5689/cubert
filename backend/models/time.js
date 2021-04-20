const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Time = new Schema({
   time_fname: {
      type: String
   },
   time_lname: {
      type: String
   },
   time_displayname: {
      type: String
   },
   time_email: {
      type: String
   },
   time_password: {
      type: String
   },
   time_roomcode: {
      type: Number
   },
   time_friendid: {
      type: String
   },
   time_statbest: {
      type: String
   },
   user_id: {
      type: String
   },
}, {
   collection: 'time'
})

module.exports = mongoose.model('User', User)
