const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const express = require("express");
const bodyParser = require('body-parser');
const url = 'mongodb://localhost:27017/';
const app = express()
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('css'));
app.use(express.static('images'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
let db;

MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err, client) {
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db('fit2095db');
        // db.collection("tasks").updateOne({
        //     TaskID: 150
        // }, {
        //     $set: {
        //         TaskStatus: 'InProgress'
        //     }
        // }, function (err, result) {});
    }

});
app.get('/', function (rqe, res) {
    res.sendFile(__dirname + '/homepage2.html');
});
app.get('/newtask2', function (rqe, res) {
    res.sendFile(__dirname + '/newtask2.html');
});
app.post('/data', function (req, res) {
    let taskDetails = req.body;
    taskDetails.taskId= getNewId();
    db.collection('tasks').insertOne({
        TaskID: taskDetails.taskId,
        TaskName: taskDetails.taskname,
        Assignto: taskDetails.assignto,
        DueDate: taskDetails.taskdue,
        TaskStatus: taskDetails.taskstat,
        TaskDescription: taskDetails.taskDesc
    });
    res.redirect('/listtasks2');

    // res.sendFile(__dirname + '/homepage2.html')
})
function getNewId() {
    return (Math.round(Math.random() * 1000));
}

app.get('/listtasks2', function (req, res) {
    db.collection('tasks').find({}).toArray(function (err, data) {
        res.render('listtasks2.html', {
            TaskDb: data
        });
    });
});

app.get('/updatetask', function (req, res) {
    res.sendFile(__dirname + '/updatetask.html');
});

app.post('/updatetaskdata', function (req, res) {
    let taskDetails = req.body;
    let filter = {
        TaskID: parseInt(taskDetails.taskId)
    };
    let theUpdate = {
        $set: {
            TaskStatus: taskDetails.taskstatnew
        }
    };
    db.collection('tasks').updateOne(filter, theUpdate);
    res.redirect('/listtasks2');
})

app.get('/deletetask', function (req, res) {
    res.sendFile(__dirname + '/deletetask.html');
});
app.post('/deletetaskdata', function (req, res) {
    let taskDetails = req.body;
    let filter = { TaskID: parseInt(taskDetails.taskId) };
    db.collection('tasks').deleteOne(filter);
    res.redirect('/listtasks2');
});

app.get('/deletetaskC', function (req, res) {
    res.sendFile(__dirname + '/deletetaskC.html');
});
app.post('/deletetaskdataC', function (req, res) {
    db.collection('tasks').deleteMany({TaskStatus:'Complete'});
    res.redirect('/listtasks2');
});


app.listen(8080);