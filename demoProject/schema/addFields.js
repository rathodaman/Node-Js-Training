var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var myschema=new Schema({
    fields: String
});

module.exports=mongoose.model('addFields',myschema);