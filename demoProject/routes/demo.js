const jsonData = [
    {name:"aman",email:"aman@gmail.com",phone:9575931593},
    {name:"aakash",email:"aakash@gmail.com",phone:8827204787},
    {name:"kiran",email:"kiran@gmail.com",phone:993413787},
    {name:"aman",email:"aman@gmail.com",phone:9575931593}
];

let keysList = Object.keys(jsonData[0]);
//console.log(keysList)
let unq_List = [];

keysList.map(keyEle=>{
  if(unq_List.length===0){
      unq_List = [...myFun(jsonData,keyEle)];
  }else{
      unq_List = [...myFun(unq_List,keyEle)];
  }
});

function myFun(array,key){
    return [...new Map(array.map(o=>[o[key],o])).values()]
}

console.log(unq_List);

 //  Discard duplicate records
      // var temp = [];
      // var obj2 = {};
      // var result = [];
      // for(i=0;i<Object.keys(elements).length;i++){

      //     if(temp.indexOf(elements[i].email) == -1){

      //         temp.push(elements[i].email);
      //    result.push(obj2.email = elements[i]);
      // }
      // }
      // console.log(" unique record IS")
      // console.log(result)




// if(pflag==1 && eflag==1){
//     console.log("Both condition satisfied.....")
//     console.log(temparr)
//     elements[i]=(temparr[i])
//     console.log("eleemnttt is ")
//     console.log(elements[i])
//     temp[i]=(elements[i])
//     console.log("temp is ")
//     console.log(temp[i])
//     console.log("new elemnts of [i] is  " +i )
//     if (req.body['data[]'].includes("email")) {
//       console.log("hey temp ...................")
//       console.log(temp)
//       if(temp.indexOf(elements[i].email) == -1){
//         console.log("element not found in datat")
//         temp[i]=elements[i].email
//         console.log(temp)
//         // temp[i].push(elements[i].email);
//       result.push(obj2.email = elements[i]);
//       console.log("Result issss")
//       console.log(result)
//      }
//     }
//     if (req.body['data[]'].includes("phone")) {
//       if(temp.indexOf(elements[i].phone) == -1){
//         temp[i]=elements[i].phone
//       result.push(obj2.phone = elements[i]);
//      }
//      else{
//        duplicate++
//      }
//     }
//   }