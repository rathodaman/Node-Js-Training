var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    product_name: String,
    product_price: Number,
    product_details: String,
    product_image: String,
    _category:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'category'
        },
    _subcategory:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'subcategory'
        }
      
});

module.exports = mongoose.model('product', myschema);