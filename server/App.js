/* FOR DEPENDENCIES AND DEBUGGING */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5500
const path = require('path')
const http = require('http');
const connection = require('./config/db')
const { errorMonitor } = require('events');
/************************** */
/* DOM & SERVER MANIPULATION AND FORM HANDLING */ 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public', { maxAge: '3d'}))
app.use(express.json())
connection.connect((err) => {
http.createServer(app)
    if (err) {
        console.log('Unable to Connect to Database, Check XAMMP/Apache connection.....');
        throw err;
    }
    else {
        console.log('Connection Ready. Database ready..............')
    }
})
/* ROUTE MANAGEMENT */
const IndexRouter = require('./routes/index')
app.use('/', IndexRouter)

app.listen(port, () => {
    console.log('App is stsarting at localhost: ' + port)
})
