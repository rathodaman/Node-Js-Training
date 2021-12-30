/**
 * Script for load db and models
 */
//DB library
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
let dbConfig = config['database'];

//create database connection and compile model schema
let options = {
  user: dbConfig.username,
  pass: dbConfig.password,
  socketTimeoutMS: 0,
  connectTimeoutMS: 0,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};
mongoose.connect('mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.database + '', options);

fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(function (file) {
  mongoose.model(path.parse(file).name, require(path.join(__dirname, file))(mongoose));
});

module.exports = mongoose;