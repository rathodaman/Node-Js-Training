var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    subcategory_name: String,
    _category:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'category'
        }
      
});

module.exports = mongoose.model('subcategory', myschema);