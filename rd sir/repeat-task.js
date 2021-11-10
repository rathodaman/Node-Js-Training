// const arr=[4,1,2,1,2];
// let comp = new Map();
// let add=0 ,add1=0;
// for (let i=0; i<arr.length; i++) {
//     if(!comp.has(arr[i])){
//         add=add+arr[i];
//         comp.set(arr[i],1);
//     }
//     add1=add1+arr[i];
// }
// console.log(2*(add)-add1);
// //---------------------------------


obj={};
var res=[];
const arr=[4,2,5,8,];
for (const i of arr) {
    //console.log(i);
    //console.log(arr);
   // console.log("obj"+obj[i])
   //obj[i] = obj[i] ? obj[i]+1 : 1;
    if(obj[i]){
        obj[i] = obj[i]+1;
    }   
    else{
        obj[i] =1; 
    }
    //console.log(obj);
}
for(let i=0; i<arr.length; i++) {
    if(Object.values(obj)[i] === 1){
        //console.log(Object.keys)
        res.push(Object.keys(obj)[i])
    }
}
if(res.length<1){
    console.log("No Match Found");
}
else{
    console.log("Different values :- "+res);
}

