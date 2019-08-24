let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('images'));
app.use(express.static('css'));
let db = [];
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())
app.get('/', function (rqe, res) {
    res.sendFile(__dirname + '/homepage.html');
});
app.get('/newtask', function (rqe, res) {
    res.sendFile(__dirname + '/newtask.html');
});
app.post('/data', function (req, res) {
    // console.log(req.body.taskname);
    db.push({
        Name: req.body.taskname,
        DueDate: req.body.taskdue,
        Description: req.body.taskDesc
    });
    res.send('New Task added')
})


db.push({
    Name: 'Task1',
    DueDate: '7/9/2019',
    Description: 'Build new Module'
});


app.get('/listtasks', function (req, res) {
    res.render('listtasks.html', {TaskDb: db});
});
app.listen(8080);





 


