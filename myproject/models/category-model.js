var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    category_name : String,
   
})
 
module.exports = mongoose.model('category',mySchema);
