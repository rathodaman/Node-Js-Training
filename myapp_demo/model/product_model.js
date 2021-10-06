var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var myschema=new Schema({
    product_name:String,
    product_details:String,
    product_price:Number,
    product_image:String,
    product_quality:String,
});
module.exports=mongoose.model('product',myschema);