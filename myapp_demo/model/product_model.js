var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var myschema=new Schema({
    product_name:String,
    product_details:String,
    product_price:Number,
    product_image:String,
    product_quality:String,
    _category:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'category'
        }
});
module.exports=mongoose.model('product',myschema);