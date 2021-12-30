var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var myschema=new Schema({
    name: String,
    email: String,
    phone: String,
    password: String
});

module.exports=mongoose.model('users',myschema);