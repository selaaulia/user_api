const { response } = require('express')
const express = require('express')
require('dotenv').config()
const db = require('./helper/db')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
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

app.get('/', (req, res) => {
    db.query('SELECT * FROM user', (err, result, fields) => {
        if(!err) {
            if(result.length) {
                res.status(200).send([{
                    success: true,
                    message: 'User List',
                    data: result
                }])
            } else {
                res.status(404).send([{
                    success: false,
                    message: 'Item user not found!'
                }])
            }
        } else {
            res.status(500).send([{
                success: false,
                message: 'Internal Server Error!'
            }])
        }
        
    })
})

app.post('/', (req, res) => {

    const nama = req.body.nama;
    const email = req.body.email;
    const alamat = req.body.alamat;

    db.query(`INSERT INTO user (nama, email, alamat) 
    VALUES ('${nama}', '${email}', '${alamat}')`, (err, result, fields) => {
        if(!err) {
            if(result.affectedRows) {
                res.status(200).send([{
                    success: true,
                    message: 'Success add user!'
                }])
            } else {
                res.status(400).send([{
                    success: false,
                    message: 'Submit user failed!'
                }])
            }
        } else {
            res.status(500).send([{
                success: false,
                message: 'Internal Server Error!'
            }])
        }
    })
})

app.listen(port, () => {
    console.log(`Listen app backend on port ${port}`)
})