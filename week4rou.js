let express = require('express');
let app = express();
let url = require('url');
let router = require('./router.js');



//both router.js and server.js should be in same directory
app.use('/', router);
app.use('/listALLItems',router);
app.use('/newItem/:name/:quantity/:price',router);
app.use('/deleteItem/:itemIdDelete',router);
app.use('/totalValue',router);



app.listen(8080);