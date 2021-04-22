const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Time = new Schema({
   time_scramble: {
      type: String
   },
   time_completedate: {
      type: Date
   },
   time_seconds: {
      type: Number
   },
   user_id: {
      type: String
   },
}, {
   collection: 'time'
})

module.exports = mongoose.model('Time', Time)
