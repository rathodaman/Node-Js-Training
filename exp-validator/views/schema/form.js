var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var myschema=new Schema({
    name:String,
    email:String,
    mobile:Number,
   password:String,
   cpassword:String,
    
});
module.exports=mongoose.model('user-validation',myschema);