console.log("hello");
const nodemailer = require("nodemailer");
var CronJob = require('cron').CronJob;
// Creating a cron job which runs on every 10 second
var job = new CronJob('* * * * * *',async function() {
// var job = new CronJob('*/5 * * * *', function() { 
console.log('You will see this message every second');

let transporter = nodemailer.createTransport({
    service:"gmail",
      auth: {
        user: "learningtesting2021@gmail.com", // generated ethereal user
        pass: "Test@123", // generated ethereal password
      },
    });
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Aman Rathod  👻" <foo@example.com>', // sender address
    to: "mohit.s@webcodegenie.com", 
    subject: "cron file", // Subject line
    text: "Cron file testing", // plain text body
  
  });
  
}, null, true, 'America/Los_Angeles');
job.start();


// // Creating a cron job which runs on every 10 second
// var job = new CronJob('* * * * * *',async function() {
//   // var job = new CronJob('*/5 * * * *', function() { 
//   console.log('You will see this message every second');
// }, null, true, 'America/Los_Angeles');
// job.start();