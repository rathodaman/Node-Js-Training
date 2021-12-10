var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    productName:
    {
        type :String
    },
    _category:
        [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'category'
        }]   
});

module.exports = mongoose.model('product', myschema);