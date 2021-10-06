var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var myschema=new Schema({
    admin_name:String,
    admin_email:String,
    admin_pass:String
});
module.exports=mongoose.model('admin',myschema);