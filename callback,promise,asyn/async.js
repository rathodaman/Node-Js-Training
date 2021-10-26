// Example 1
// async function asyncFunc() {
//         let data;
//         // fetch data from a url endpoint
//         axios.get("/some_url_endpoint")
//         .then((result) => {
//             data = result
//         });
//         return data;
//     }

// Example 2
// let promise = new Promise(function (resolve, reject) {
//         setTimeout(function () {
//         resolve('Promise resolved')}, 4000);
//     });
//     // async function
//     async function asyncFunc() {
//         // wait until the promise resolves
//         let result = await promise;
//         console.log(result);
//         console.log('Hello Async() Called ');
//     }
//     // calling the async function
//     asyncFunc();




// Example 4
    // function asyncF(num){
    //     return new Promise(resolve=>{
    //         setTimeout(function () {
    //             resolve('Promise resolved'+num)}, 4000);
    //     })         
    // }
    // // async function
    // async function asyncFunc() {
    //     // wait until the promise resolves
    //     //let result = await asyncF(10);
    //     asyncF(10).then((result) => {console.log(result);})
    //     //console.log(result);
    //     console.log('Hello Async() Called ');
    // }
    // // calling the async function
    // asyncFunc();





// Example 5 task
function asyncF(num){
    return new Promise(resolve=>{
                setTimeout(function () {
                    console.log(num*2)
                    resolve(num*2)}, 2000);
            })         
        //return new Promise((resolve) => setTimeout(() => {  console.log(num*2),new Promise((resolve) => setTimeout(() => { return console.log(num*2),new Promise((resolve) => setTimeout(() => { return console.log(num+10), resolve() }, 2000))}, 2000)) }, 2000));
        // return new Promise((resolve) => setTimeout(() => {console.log(num*2), resolve() }, 2000));
        // return new Promise((resolve) => setTimeout(() => { console.log(num*2), resolve() }, 2000));          
}
// async function
async function asyncFunc() {
    // wait until the promise resolves
    try{
        // let result = await asyncF(2);
        // let result1 = await asyncF(result);
        // let result2 = await asyncF(result1);
        // let result3 = await asyncF(result2);
        //asyncF(2).then((data) => {asyncF(data).then((data2) => {asyncF(data2).then((data3) => {})})})
        asyncF(2).then((result) => {asyncF(result).then((result1) =>{asyncF(result1).then(result1)})})
         console.log('Hello Async() Called ');
    }catch(error){
        console.log(error);
    }
  
}
// calling the async function
asyncFunc();




// Example 3
//Class methods can be async
// class Example {
//     async asyncMethod() {
//     const data = await axios.get("/some_url_endpoint");
//     return data
//     }
// }
// const exampleClass = new Example();
// exampleClass.asyncMethod().then(console.log("Hello Aman"))