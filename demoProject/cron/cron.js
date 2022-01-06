const csvFileSchema = require('../schema/csvFileSchema');
const importCsvData = require('../schema/importCsvData');
const scheduler = require('../schedular/schedular');
const CSVToJSON=require('csvtojson');
var fs = require('fs');
const CronJob = require('cron').CronJob;
var job = new CronJob(scheduler.files.cron.time,async function() {
  // var job = new CronJob('*/30 * * * * *',async function() {
    if(scheduler.scheduler === 'on'){
      if(scheduler.files.cron.active === true){
        try{
          console.log('You will see this message every 30 second');
          var csvFileDetailsData=await csvFileSchema.find({status:'pending'});
          console.log("csvFileDetailsData");
          console.log(csvFileDetailsData);
          for (var i=0; i<csvFileDetailsData.length;i++){
            let mykey1 =csvFileDetailsData[i].fieldMappingObject
            console.log("mykey1")
            console.log(mykey1)
            let mykey = mykey1.length;
            console.log(mykey);
            let currentFileId=csvFileDetailsData[i]._id;
            console.log("currentFileId");
            console.log(currentFileId);
      
            let filePath =csvFileDetailsData[i].filePath;
            console.log("filePath");
            console.log(filePath);
            if(mykey>0){
              const users = await CSVToJSON({noheader:true,output: "csv"}).fromFile(filePath);
              const fileInformation1=({
                status: "In Progress"
              });
              var csvFileDetailsData=await csvFileSchema.findByIdAndUpdate(currentFileId,fileInformation1);
              console.log("csvFileDetailsData");
              console.log(csvFileDetailsData);
      
              var myobj=null;
              var csvArray=[];
            
              for(let i=0; i<users.length; i++){
                  myobj = {};
                  for(let j=0; j<mykey; j++){
                      myobj[mykey1[j]]=users[i][j];
                  } 
                  console.log(myobj);
                  csvArray.push(myobj)
              }
              console.log(csvArray);
              
              let totalrecords=csvArray.length
              console.log("totalrecords");
              console.log(totalrecords);
            
              //discard And Duplicates Both
              const regexEmail = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
              const regexPhone ='^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$';
              let count=0;
              var elements = [];
              var check = {};
              var a=Object.assign({}, csvArray);
              console.log("Array of Object Assign in Object")
              console.log(a)
              var flag=1;
              var press=1;
              var p=0;
              var temp = [];
              var obj = {};
              var uniqueRecord = [];
              for(var i=0; i<csvArray.length; i++)
              {
                if(mykey1.includes('email')){
                    flag=0
                  if(a[i].email.match(regexEmail)){
                    flag=1
                  }
                }
                if(mykey1.includes('phone')){
                    press=0
                  if(a[i].phone.match(regexPhone)){
                    press=1
                  }
                }
                if(flag==1 && press==1){
                  elements.push(a[i])
                  check[p]=Object.assign({},a[i]);
                  if(Object.keys(check).length){
                    if((temp.indexOf(check[p].email) == -1)){
                      temp.push(check[p].email);
                      obj.email = check[p]
                      uniqueRecord.push(obj.email = check[p]);
                    }
                  }
                  p++;
                }
                else{
                  count++;
                } 
              }
            
            
              console.log("After Discarded")
              console.log(elements)
              console.log("discarded record No :- ",count)
              // console.log(" Unique Record is")
              // console.log(uniqueRecord)
            
              let afterDiscardNo =elements.length;
              console.log("afterDiscardNo");
              console.log(afterDiscardNo);
            
              console.log("uniqueRecord")
              console.log(uniqueRecord)
              let uniqueRecordNo=uniqueRecord.length;
            
              let duplicateRecordsNo =afterDiscardNo-uniqueRecordNo;
              console.log("uniqueRecordNo");
              console.log(uniqueRecordNo);
            
              console.log("duplicateRecordsNo");
              console.log(duplicateRecordsNo);
             
              //store in DB
              var data=await importCsvData.create(uniqueRecord);
              console.log("data");
              console.log(data);
        
              //status update [uploaded]
              const fileInformation=({
                totalRecords:users.length,
                duplicates: duplicateRecordsNo,
                discarded: count,
                totalUploaded: uniqueRecordNo,
                status: "Uploaded"
              });
              var csvFileDetailsData=await csvFileSchema.findByIdAndUpdate(currentFileId,fileInformation);
              console.log(csvFileDetailsData);
            }
          }
        }catch(err){
          console.log(err);
        }
      }
      else{

      }
    }
    if(scheduler.scheduler === 'off'){
      console.log('scheduler is off');
      job.stop();
    }

   
}, null, true, 'America/Los_Angeles');
job.start();
