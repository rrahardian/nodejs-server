const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567890',
    database: 'user'
})

app.listen(3000)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(express.static('public'))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Method', 'GET, PUT, POST, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

db.connect()

app.get('/api/getAccount', (req, res)=>{
    let sql = `select * from account`
    db.query(sql, (err, result)=>{
        if (err) throw err
        res.send(result)
    })
})

app.post('/api/addAccount', (req, res)=>{
    let data = {
        id: null,
        username: req.body.username,
        password: req.body.password,
        created_date: new Date()
    }
    let sql = 'insert into `account` (`id`, `username`, `password`, `created_date`) values (?, ?, ?, ?)'
    db.query(sql, [data.id, data.username, data.password, data.created_date], (err, result)=>{
        if (err) throw err
        res.send(result)
    })
})