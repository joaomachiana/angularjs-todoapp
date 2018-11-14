// Initialising Node Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path');

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Default page
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// port 
app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});

// // Connection a db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'todoapp',
    password: 'todoapp',
    database: 'todoapp'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});


// Routes

// API

// Get all tasks
app.get('/tasks', function (req, res) {
    connection.query('SELECT * FROM tasks', function (error, data, fields) {
        if (error) throw error;

        return res.send(JSON.stringify(data));
    });
});


// Add task
app.post('/addtask', function (req, res) {
    var task = JSON.parse(JSON.stringify(req.body));

    connection.query('INSERT INTO tasks SET ? ', {
        'name': req.body.name, 'description': req.body.description, 'assignee': req.body.assignee,
        'status': req.body.status
    }, function (error, results, fields) {
        if (error) throw error;

        console.log('Task created successfully!!');
        return res.send({ error: false, data: results, message: 'Task created successfully!' });
    });
});


// Update task
app.put('/updatetask', function (req, res) {

    let task_id = req.body.task_id;
    let task_status = req.body.task_status;

    connection.query('UPDATE tasks SET status = ? WHERE id = ?', [task_status, task_id], function (error, results, fields) {
        if (error) throw error;

        return res.send({ error: false, data: results, message: 'Task has been updated successfully!' });
    });
});


// Delete task
app.delete('/deletetask', function (req, res) {
    let task_id = req.body.task_id;

    connection.query('DELETE FROM tasks WHERE id = ?', [task_id], function (error, results, fields) {
        if (error) throw error;

        return res.send({ error: false, data: results, message: 'The Task has been successfully deleted!' });
    });
});