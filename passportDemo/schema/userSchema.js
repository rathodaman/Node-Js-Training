var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var myschema=new Schema({
    user_name: String,
    user_gender: String,
    user_dob: String,
    user_mobile: String,
    user_email: String,
    user_password: String
});
module.exports=mongoose.model('users',myschema);