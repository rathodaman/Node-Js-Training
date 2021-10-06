var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var myschema=new Schema({
    user_name:String,
    user_pass:String,
    user_gender:String,
    user_email:String,
    user_dob:String,
    user_address:String,
    user_city:String
});
module.exports=mongoose.model('users',myschema);