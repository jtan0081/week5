let express = require('express');
let router = express.Router();

// let rec = {
//     ID: 348,
//     name: 'TV',
//     quantity: 20,
//     price: 1500,
//     cost: 30000
// };
// db.push(rec);

let db = [];
router.get('/', function (req, res) {
   res.send('It is a warehouse management system');
});
router.get('/listALLItems', function (req, res) {
   res.send(generateList());
});
router.get('/newItem/:name/:quantity/:price', function (req, res) {
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
router.get('/deleteItem/:itemIdDelete', function (req, res) {
   console.log(req.params);
   deleteItem(req.params.itemIdDelete);
   res.send(generateList());
})
router.get('/totalValue', function (req, res) {
   let tot = 0;
   for (let i = 0; i < db.length; i++) {
       tot+=db[i].cost   
   }
   res.send('The total value in warehouse is ' + tot);
})
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

//export this router 
module.exports = router;

