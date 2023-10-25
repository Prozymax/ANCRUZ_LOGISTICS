const express = require('express')
const app = express();
const BodyParser = require('body-parser');
require('dotenv').config()
const path = require('path');
const Mail = require('nodemailer');
const connection = require('./config/db');
const http = require('http');
const bodyParser = require('body-parser');
const App = { port: 4000, message: () => { return `Admin App is listening at 4000` } }
http.createServer(app)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(express.static('public/admin'))
connection.connect((err) => {
    if (err) 
    {
        console.log('Error connecting to database', err)
        throw err;
    }
    else 
    {
        console.log('Connected to database')
    }
})


app.get('/', (request, response) => {
    response.sendFile('/index.html');
})

app.post('/dashboard', (request, response) => {
        username = request.body.username;
        password = request.body.password;
        const wdQuery = 'SELECT * FROM admin WHERE username=? AND password=?';
        connection.query(wdQuery, [username, password], (CheckErr, CheckResults) => {
        if (CheckErr) 
        {
            console.log('Error encountered while Checking data', CheckErr)
            response.json({ message: 'Error encountered while Checking data', Err: CheckErr })
        }
        else if (CheckResults.length > 0)
        {
            console.log('Data matches', CheckResults)
            response.sendFile(path.join(__dirname, 'public', 'admin', 'dashboard.html'))
        }
        else
        {
            console.log('No such user')
            response.json({ message: 'No such user ', CheckResults})
        }
    })
})

app.post('/add_order', (request, response) => {
    const addOrderDetails = {
        orderid: request.body.orderid,
        fullname: request.body.name,
        email: request.body.email,
        address: request.body.address,
        phone: request.body.phone,
        orderStatus: request.body.status
    }
    const insertQuery = 'INSERT INTO all_orders SET ?'
    connection.query(insertQuery, addOrderDetails, (err, result) => {
        if (err) {
            console.log('Error inserting into database', err)
            response.json({ messgae: 'Error Connecting to database', Err: err})
        }
        else if (result.length > 0) {
            console.log('Data Inserted', result);
            response.json({ messgae: 'Succesful Insertion', result: result})
        }
        else {
            console.log('Data not inserted into database');
            response.json({ message: 'Data not inserted into database', result: result })
        }
    })
})

app.post('/update_order', (request,response) => {
    const orderStatus = request.body.status,
            orderid = request.body.orderid

    const updateQuery = 'UPDATE all_orders SET orderStatus = ? WHERE orderid = ?';;
    connection.query(updateQuery, [orderStatus, orderid], (updateErr,updateResult) => {
        if (updateErr) {
            console.log('Error updating column...', updateErr);
            response.json({ message: 'Error encountered before updating column..', Err: updateErr})
        }
        else if (updateResult.affectedRows == 0) {
            console.log('No such order');
            response.json({ message: 'Order does not exist'})
        }
        else {
            console.log('Update Succesfull', updateResult);
            response.json({ message: 'Update Successful', updateResult })
        }
    })
})

app.post('/delete_order', (request, response) => {
    const orderid = request.body.orderid
    const deleteQuery = 'DELETE FROM all_orders WHERE orderid = ?';
    connection.query(deleteQuery, [orderid], (deleteErr, deleteResults) => {
        if (deleteErr) {
            console.log('Error encountered while deleting the order', deleteErr);
            response.json({ message: 'Eror encountered while deleting the order', Error: deleteErr })
        }
        else if (deleteResults.affectedRows == 0) {
            console.log('No such order');
            response.json({ message: 'Order does not exist'})
        }
        else {
            console.log('Deletion succesful', deleteResults);
            response.json({ message: 'Order has been deleted', Result: deleteResults })
        }
    })
})

app.post('/get_order_details', (request, response) => {
    const orderid = request.body.orderid,
        getQuery = 'SELECT * FROM all_orders WHERE orderid = ?';
        connection.query(getQuery, [orderid], (getErr, getResults) => {
            if (getErr) {
                console.log('Eror encountered while getting order info');
                response.json({ message: 'Error Encountered while getting order info', Error: getErr})
            }
            else if (!getResults.length > 0) {
                console.log('Order does not exist');
                response.json({ message: 'Order doess not exist'});
            }
            else {
                console.log('Order exists', getResults);
                response.json({ message: 'Order Exists', OrderData: getResults })
            }
        })
})

app.listen(App.port, () => {
    console.log(App.message())
})

