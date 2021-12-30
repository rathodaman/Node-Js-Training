console.log("hello aman");
const moment = require('moment');
const date = moment()
console.log(date)

//object from a string
let d1 = moment("2021-12-28");
console.log(d1.format('llll'));
//object is created from an array
let d2 = moment([2021, 11, 23]);
console.log(d2.format('llll'));
// JSON objects to create moment objects
let d3 = moment({ year :2010, month :3, day :5,
hour :15, minute :10, second :3, millisecond :123});
console.log(d3.format('llll'));
//unix time stamp (in milliseconds) to define a moment object
let d4 = moment(1530471537000);
console.log(d4.format('llll'));
//JavaScript built-in Date object to define a moment object
let d5 = moment(new Date(2011, 11, 22));
console.log(d5.format('llll'));


console.log("hello11");
var currentDate1 = moment();
console.log('Current Date 1: ' + currentDate1);
var currentDate2 = moment().format();
console.log('Current Date 2: ' + currentDate2);
var currentDate3 = moment().format('DD/MM/YYYY');
console.log('Current Date 3: ' + currentDate3);
var currentDate33 = moment().format('DD-MM-YYYY');
console.log('Current Date 3: ' + currentDate33);
var currentDate4 = moment().unix();
console.log('Current Date 4: ' + currentDate4);
var currentDate5 = moment().toISOString();
console.log('Current Date 5: ' + currentDate5);


//Moment.js datetime parts
let now = moment();
let year = now.get('year');
let month = now.get('month'); // 0 to 11
let date1 = now.get('date');
let hour = now.get('hour');
let minute = now.get('minute');
let second = now.get('second');
let millisecond = now.get('millisecond');
console.log("Moment.js datetime parts");
console.log("now: " + now);
console.log("Year: " + year);
console.log("Month: " + month);
console.log("Date: " + date1);
console.log("Hour: " + hour);
console.log("Minute: " + minute);
console.log("Second: " + second);
console.log("Millisecond: " + millisecond);
//Moment.js day of week, month, year
console.log("Day of week: " + now.weekday());
console.log("Day of month: " + now.date());
console.log("Day of year: " + now.dayOfYear());
console.log("Quarter of year: " + now.quarter());
console.log("Weeks in year: " + now.weeksInYear());

//Moment.js localized date and time
// moment.locale('en');
// //let now = moment();
// console.log(now.format('LLLL'));
// // moment.locale('gu');
// now = moment();
// console.log(now.format('LLLL'));
// moment.locale('hi');
// now = moment();
// console.log(now.format('LLLL'));

//Date Format
console.log("Date Format..........");
let m = moment().format('D-M-YYYY hh:mm A ');
console.log(m);
let m1 = moment().format('dddd, MMMM Do YYYY');
console.log(m1);

//Validating a date
console.log("Validating a date...");
let n = moment('2021-13-23').isValid()
console.log(n); //false
let n1 = moment('2021-11-23').isValid()
console.log(n1);//true

//Time ago, time until date
let o = moment('2015-05-23').fromNow();
console.log(o); // 7 Years Ago
let o1 = moment('2021-11-27').fromNow();
console.log(o1); // A Month Ago

//Manipulate a date
console.log("Manipulate a date");
let p = moment('2021-11-23').add(1, 'week')
console.log(p);
let p1 = moment('2021-11-25').subtract(1, 'month')
console.log(p1);

//Difference Between Two Dates In Years, Months, Days
console.log("Difference Between Two Dates In Years, Months, Days");
var startDate = moment('25-12-2020', 'DD-MM-YYYY');
var endDate = moment('31-03-2022', 'DD-MM-YYYY');
var dayDiff = endDate.diff(startDate, 'days');
console.log('Days:' + dayDiff);
var monthDiff = endDate.diff(startDate, 'months');
console.log('Month:' + monthDiff);
var yearDiff = endDate.diff(startDate, 'years');
console.log('Year:' + yearDiff);

//Dealing with timezones using moment.js
