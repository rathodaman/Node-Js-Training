var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    categoryName :{type:String}
})
 
module.exports = mongoose.model('category',mySchema);
