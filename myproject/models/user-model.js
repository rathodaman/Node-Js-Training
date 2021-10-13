var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    user_name : String,
    user_gender : String,
    user_email : String,
    user_password : String,
    user_address : String,
    user_photo : String,
    _area:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'area'
        },
    
})
 
module.exports = mongoose.model('users',mySchema);
