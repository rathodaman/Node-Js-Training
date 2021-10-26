var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var myschema=new Schema({
    name:String,
    mobile:Number,
    address:String,
});
module.exports=mongoose.model('node-fetch',myschema);