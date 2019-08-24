let express = require('express');
let app = express();
let url = require('url');
let db = [];
let rec = {
    ID: 348,
    name: 'TV',
    quantity: 20,
    price: 1500,
    cost: 30000
};
db.push(rec);
app.get('/', function (req, res) {
    res.send('It is a warehouse management system');
});
app.get('/listALLItems', function (req, res) {
    res.send(generateList());
});
app.get('/newItem/:name/:quantity/:price', function (req, res) {
    // let curUrl = req.url;
    // let q = url.parse(curUrl, true).query;
    // console.log(req.params);
    let na = req.params.name;
    let co = req.params.quantity * req.params.price;
    let newRec = {
        ID: Math.round(Math.random() * 1000),
        name: na,
        quantity: parseInt(req.params.quantity),
        price: parseInt(req.params.price),
        cost: co
    }
    // console.log(newRec.cost);
    db.push(newRec);
    // console.log(db);


    res.send(generateList());
});

app.get('/deleteItem/:itemIdDelete', function (req, res) {
    console.log(req.params);
    deleteItem(req.params.itemIdDelete);
    res.send(generateList());
})
app.get('/totalValue', function (req, res) {
    let tot = 0;
    for (let i = 0; i < db.length; i++) {
        tot+=db[i].cost   
    }
    res.send('The total value in warehouse is ' + tot);
})


app.listen(8080);

function deleteItem(id) {
    for (let i = 0; i < db.length; i++) {
        if (db[i].ID == id) {
            db.splice(i, 1);
        }
    }
}

function generateList() {
    let st = 'ID  |  Name  |   quantity  |  price  | cost  </br>';
    for (let i = 0; i < db.length; i++) {
        st += db[i].ID + ' | ' + db[i].name + ' | ' + db[i].quantity + ' | ' + db[i].price + ' | ' + db[i].cost + '</br>';
    }
    return st;
}
// function totalValue(){
//     let tot = 0;
//     for (let i = 0; i < db.length; i++) {
//         tot+=db[i].cost   
//     }
//     return tot;
// }


// let express = require('express');
// let app = express();
// app.listen(8080);
// app.get('/', function (req, res) {
//     console.log(req.query.name);
//     console.log(req.query.age);
//     console.log(req.query.address);
//     res.send('Hello from FIT2095');
// });

// let express = require('Express');
// let app = express();
// let router = require('./router.js');
// //both router.js and server.js should be in same directory
// app.use('/', router);
// app.listen(8080);