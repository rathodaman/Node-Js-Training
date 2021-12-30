var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var myschema=new Schema({
    name: String,
    email: String,
    phone: String
});

module.exports=mongoose.model('importCsvData',myschema);