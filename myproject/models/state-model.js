var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    state_name : String,
   
})
 
module.exports = mongoose.model('state',mySchema);
