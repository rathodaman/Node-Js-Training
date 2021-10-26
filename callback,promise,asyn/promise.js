// Example 1
// Promise.resolve()
// .then(() => console.log('then#1'))
// .then(function () {
//     console.log('or aman')
// })
// .then(() => console.log('then#2'))
// .then(() => console.log('then#3'))
// .then(() => console.log('then#4'))
// .then(() => console.log('then#5'))
// .then(() => console.log('then#6'))
// .catch(console.error);





// Example 2
const a = () => new Promise((resolve) => setTimeout(() => { console.log('a'), resolve() }, 1000));
const b = () => new Promise((resolve) => setTimeout(() => { console.log('b'), resolve() }, 1000));
const demo = function (){
    new Promise(function (resolve){
        setTimeout(function () {
            console.log('demo')
            resolve()
        },1000)
    })
}
const c = () => new Promise((resolve, reject) => setTimeout(() => { console.log('c'), reject('Oops!') }, 1000));
const d = () => new Promise((resolve) => setTimeout(() => { console.log('d'), resolve() }, 1000));
Promise.resolve()
.then(a)
.then(b)
.then(demo)
.then(c)
.then(d)
.catch(console.error)
.finally(() =>console.log("always called"))





// Example 3
// Promise.resolve('hello Good morning')
// .then(console.log)
// .catch(console.error)

// Promise.reject('by Good night')
// .then(console.log)
// .catch(console.error)




//Example 4
// const a = () => new Promise((resolve) => setTimeout(() => resolve('a'), 2000));
// const b = () => new Promise((resolve) => setTimeout(() => resolve('b'), 1000));
// const c = () => new Promise((resolve) => setTimeout(() => resolve('c'), 1000));
// const d = () => new Promise((resolve) => setTimeout(() => resolve('d'), 1000));
// console.time('promise.all');
// Promise.all([a(), c(), b(), d()])
// .then(results => console.log(`Done! ${results}`))
// .catch(console.error)
// .finally(() => console.timeEnd('promise.all'));




//Example 5
// const a = () => new Promise((resolve) => setTimeout(() => resolve('a'), 2000));
// const b = () => new Promise((resolve) => setTimeout(() => resolve('b'), 1000));
// const c = () => new Promise((resolve) => setTimeout(() => resolve('c'), 1000));
// const d = () => new Promise((resolve) => setTimeout(() => resolve('d'), 600));
// console.time('promise.race');
// Promise.race([a(), c(), b(), d()])
// .then(results => console.log(`Done! ${results}`))
// .catch(console.error)
// .finally(() => console.timeEnd('promise.race'));
