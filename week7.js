const mongoose = require('mongoose');
const Developer = require('./model/developers');
const Task = require('./model/task');
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
mongoose.connect('mongodb://localhost:27017/fit2095db', {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');
});
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err, client) {
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db('fit2095db');
    }
});

app.post('/developerdata', function (req, res) {
    let devDetails = req.body;
    let developer1 = new Developer({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: devDetails.firstname,
            lastName: devDetails.lastname
        },
        level: devDetails.level,
        address: {
            State: devDetails.state,
            Suburb: devDetails.suburb,
            Street: devDetails.street,
            Unit: devDetails.unit
        }
    });
    developer1.save(function (err) {
        if (err) throw err;
        console.log('developer1 successfully Added to DB');
    });
    res.redirect('/listdeveloper');
});
app.get('/newdeveloper', function (rqe, res) {
    res.sendFile(__dirname + '/newdeveloper.html');
});
app.get('/listdeveloper', function (req, res) {
    db.collection('developercols').find({}).toArray(function (err, data) {
        res.render('listdeveloper.html', {
            DeveloperDb: data
        });
    });
});
app.get('/', function (rqe, res) {
    res.sendFile(__dirname + '/homepage2.html');
});
app.get('/newtask2', function (rqe, res) {
    res.sendFile(__dirname + '/newtask2.html');
});
app.post('/taskdata', function (req, res) {
    let tasDetails = req.body;
    let task1 = new Task({
        Taskname: tasDetails.taskname2,
        Assignto: tasDetails.assignto2,
        Duedate: tasDetails.duedate,
        TaskStatus: tasDetails.status,
        TaskDescription: tasDetails.desc
    });
    task1.save(function (err) {
        if (err) throw err;
        console.log('task1 successfully Added to DB');
    });
    res.redirect('/listtask');
});
app.get('/tasknew', function (rqe, res) {
    res.sendFile(__dirname + '/tasknew.html');
});
app.get('/listtask', function (req, res) {
    db.collection('taskcols').find({}).toArray(function (err, data) {
        res.render('listtask.html', {
            taskDb: data
        });
    });
});
app.get('/deletetask', function (req, res) {
    res.sendFile(__dirname + '/deletetask.html');
});
app.post('/deletetaskdata', function (req, res) {
    let taskDetails = req.body;
    // let filter = { _id:taskDetails.taskId};
    // console.log(taskDetails.taskId);
    Task.deleteOne({
        '_id': taskDetails.taskId
    }, function (err, doc) {
        // console.log(doc);
    });
    // db.collection('taskcols').deleteOne(filter);
    res.redirect('/listtask');
});
app.get('/deletetaskC', function (req, res) {
    res.sendFile(__dirname + '/deletetaskC.html');
});
app.post('/deletetaskdataC', function (req, res) {
    Task.deleteMany({
        'TaskStatus': 'Complete'
    }, function (err, doc) {
        // console.log(doc);
    });
    res.redirect('/listtask');
});
app.get('/updatetask', function (req, res) {
    res.sendFile(__dirname + '/updatetask.html');
});

app.post('/updatetaskdata', function (req, res) {
    let taskDetails = req.body;
    Task.updateOne({
        '_id': taskDetails.taskId
    }, {
        $set: {
            'TaskStatus': taskDetails.taskstatnew
        }
    }, function (err, doc) {
        // console.log(doc);
    });
    res.redirect('/listtask');
})

app.get('/extra', function (req, res) {
    Task.where({
        'TaskStatus': "Complete"
    }).where('Taskname').limit(3).sort({
        Taskname: -1
    }).exec(function (err, docs) {
         res.send(docs);
    });
   
});
app.listen(8080);