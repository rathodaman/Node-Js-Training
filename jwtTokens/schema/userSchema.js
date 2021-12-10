var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const bcrypt = require('bcrypt');


var myschema=new Schema({
    user_name: String,
    user_gender: String,
    user_dob: String,
    user_mobile: String,
    user_email: String,
    user_password: String
});
myschema.pre("save",async function(next){
    if(this.isModified("user_password")){
        console.log(`the current password is ${this.user_password}`);
        this.user_password=await bcrypt.hash(this.user_password,10);
        console.log(`the current password is ${this.user_password}`);
    }
    next();
})
module.exports=mongoose.model('users',myschema);