var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    area_name: String,
    _state:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'state'
        },
    _city:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'city'
        }
      
});

module.exports = mongoose.model('area', myschema);