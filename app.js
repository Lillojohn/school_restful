const express = require('express');
const bodyParser = require('body-parser');
const jsonparser = bodyParser.json();
const dotenv = require('dotenv').config();
const uuid = require('uuid/v4');


// Create a new instance of express
const app = express();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: dotenv.parsed.HOST,
    user: dotenv.parsed.USER,
    password: dotenv.parsed.PASSWORD,
    database: dotenv.parsed.DATABASE
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/board', jsonparser, function (req, res) {
    try {
        connection.query('SELECT * FROM board', function (error, results, fields) {
            if (error) throw error;
            res.send({"status": 200, "error": null, "response": results});
        });
    } catch (exception) {

    }
});

app.post('/board', jsonparser, function (req, res) {
    try {
        connection.query('INSERT INTO board (id, name) VAlUES (?, "afiwuygfaiugfa")', uuid(), function (error, results, fields) {
            if (error) throw error;
            res.send({"status": 200, "error": null, "response": results});
        });
    } catch (exception) {

    }
});

app.post('/column', jsonparser, function (req, res) {
    try {
        let name = req.body.name;
        let type_id = req.body.type_id;
        let board_id = req.body.board_id;

        if(!name || !type_id || !board_id){
            res.send({"status": 403, "error": null});
        }
        
        connection.query('INSERT INTO board_column (id, name, type_id, board_id) VALUES (?, ?, ?, ?)', [uuid(), name, type_id, board_id], function (error, results, fields) {
            if (error) throw error;
            res.send({"status": 200, "error": null, "response": results});
        });
    } catch (exception) {

    }
});

app.get('/column', jsonparser, function (req, res) {
    try {
        connection.query('SELECT * FROM board_column', function (error, results, fields) {
            if (error) throw error;
            res.send({"status": 200, "error": null, "response": results});
        });
    } catch (exception) {

    }
});

app.get('/column/:id', jsonparser, function (req, res) {
    try {
        connection.query('SELECT * FROM board_column WHERE id = ?', req.params.id, function (error, results, fields) {
            if (error) throw error;
            res.send({"status": 200, "error": null, "response": results});
        });
    } catch (exception) {

    }
});
//
// app.put('/column/:id', jsonparser, function (req, res) {
//     try {
//         let name ?
//         connection.query('UPDATE board_column SET name = ?', req.params.id, function (error, results, fields) {
//             if (error) throw error;
//             res.send({"status": 200, "error": null, "response": results});
//         });
//     } catch (exception) {
//
//     }
// });

app.post('/column_type', jsonparser, function (req, res) {
    try {
        let name = req.body.name;
        connection.query('INSERT INTO column_type (id, name) VAlUES (?, ?)', [uuid(), name], function (error, results, fields) {
            if (error) throw error;
            res.send({"status": 200, "error": null, "response": results});
        });
    } catch (exception) {

    }
});

app.get('/column_type', jsonparser, function (req, res) {
    try {
        connection.query('SELECT * FROM column_type', function (error, results, fields) {
            if (error) throw error;
            res.send({"status": 200, "error": null, "response": results});
        });
    } catch (exception) {

    }
});


// app to listen on port 4000
app.listen(4000, function (err) {
    if (err) {
        throw err
    }
    console.log('Server started on port 4000')
});