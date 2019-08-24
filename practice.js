// let obj = {
//     name: 'Tom',
//     age: 20,
//     address: 'Melbourne',
//     university: 'Monash'
//    }

//    for (let key in obj) {
//      let value = obj[key];
//      if (isNaN(value))
//         console.log(key);
//    }

// let obj={
// 	type:"BMW",
// 	model:"530",
// 	color:"blue",
// 	year:"1997"
// };
// console.log(obj);
// console.log(obj.year);
// let key = "model";
// console.log(obj[key]);

// let obj = {
//     name: 'Tom',
//     age: 20,
//     address: 'Melbourne',
//     university: 'Monash'
// }
// const { address} = obj;
// if (address === 'melbourne' && obj.name === 'Tom') {
// console.log("Tom lives in Melbourne");
// } else {
// console.log('Something wrong with the name or address');
// }console.log('Mission Accomplished');

var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    if (req.url === '/unit') {
        res.write('Hello from FIT2095')
    } else if (req.url === '/year') {
        res.write('its 2019')
    } else {
        res.write('Have a good day!!!')
    }

    res.end();
}).listen(6789);