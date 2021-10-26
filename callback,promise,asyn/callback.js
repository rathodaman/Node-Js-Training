// Note:- Simple synchronization function
// function ShowMsg(name,callback) {
//     setTimeout(function() {
//         console.log('Hi' + ' ' + name);
//     },5000)
   
//     callback();
//  }
//  function DemoCallBack(){
//     console.log("I am callback function");
//  }
//  ShowMsg('Akash',DemoCallBack); // Hi Akash




//Note:- Simple Asynchronization function
    function ShowMsg(then)
    {
        setTimeout(then,2000) 
        console.log('call first asynchronously');
    }
    ShowMsg(function() {
        console.log("Done");
    })
    console.log("call second");