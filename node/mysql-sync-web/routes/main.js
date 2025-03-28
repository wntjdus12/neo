const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('sync-mysql');
const env = require('dotenv').config({ path: "../../.env"})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var connection = new mysql({
    host: process.env.host,
    user: process.env.user,
    port: process.env.port,
    password: process.env.password,
    database: process.env.database
})

app.get('/Hello', (req, res) => {
    res.send('Hello World!!')
})



app.get('/select', (req, res) => {
    let result = connection.query('select * from st_info');
    console.log(result);
    // res.send(result);

})

app.get('/insert', (req, res) => {
    const { st_id, name, dept } = req.query;
    let result = connection.query("insert into st_info values (?, ?, ?)", 
        [st_id, name, dept]);
        res.redirect('/select');
})

app.get('/update', (req, res) => {
    const { st_id, name, dept } = req.query;
    const result = connection.query("update st_info set NAME = ?, DEPT = ?  where ST_ID = ?",
        [name, dept, st_id]);
        res.redirect('/select');
})

app.get('/delete', (req, res) => {
    const { st_id } = req.query;
    const result = connection.query("delete from st_info where ST_ID = ?",
        [st_id]);
        res.redirect('/select');
})

module.exports = app;

