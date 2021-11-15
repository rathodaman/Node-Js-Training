var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    firstName : String,
    LastName : String,
    interest : String,
    gender : String,
    hobby : [{type: String}],
    address : String,
    image : String,
})
 
module.exports = mongoose.model('user',mySchema);