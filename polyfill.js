// Array.prototype.myMap = function (cb) {
//     if (!cb) {
//         throw new error('Cb not defined')
//     }
//     let res = []
//     for (let i = 0; i < this.length; i++) {
//         res.push(cb(this[i], i, this))
//     }
//     return res
// }
// let arr = [1,2,3,4,5];
// let res = arr.myMap((item)=>{
//     return item * 2
// })
// console.log(res)

// let str = 'Yash'
// function rtnStr(str) {

//     let res = ''

//     for (let i = str.length-1; i >= 0; i--) {
//         res += str[i]
//     }
//     return res
// }
// console.log(rtnStr(str));


Array.prototype.myForEach = function (cb) {

    for (let i = 0; i < this.length; i++) {
        cb(this[i], i, this)
    }
}

const arr = [1, 2, 3, 4, 5];

const res = arr.myForEach((item) => {
    console.log(item * 2);
})
// console.log(res);
