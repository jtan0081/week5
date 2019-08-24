// let express = require('express');
// let app = express();
// let url = require('url');
// app.get('/math/add/:oprand1/:oprand2', function(req,res){
//    let n1 =parseInt(req.params.oprand1);
//    let n2 = parseInt(req.params.oprand2);
//    let result = n1 + n2;
//    res.send("Output: "+result);
// });
// app.get('/math/sub/:oprand1/:oprand2', function(req,res){
//    let n1 =parseInt(req.params.oprand1);
//    let n2 = parseInt(req.params.oprand2);
//    let result = n1-n2;
//    res.send("Output: "+result);
// });
// app.listen(8080);

let express = require('express');
let app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(express.static('css'));

app.get('/gettime', function(req, res){
let d = new Date();
let msg = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
res.send(msg);
});

app.get('/getdate', function(req, res){
let d = new Date();
let msg = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
res.send(msg);
});

app.listen(8080);