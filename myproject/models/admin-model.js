var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    admin_name : String,
    admin_email : String,
    admin_password : String,
})
 
module.exports = mongoose.model('admin',mySchema);
