const express = require('express')
const app = express()
const router = express.Router();
const connection = require('../config/db')
const bodyParser = require('body-parser');
const path = require('path')
const { errorMonitor } = require('events');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
const MailTransporter = require('../config/mail')
app.use(express.json())

router.get('/', (request, response) => {
    response.sendFile('/index.html');
})

router.post('/support-mail-sent', async (request, response) => {
    const email = request.body.email,
    subject = request.body.subject,
    fullname = request.body.name,
    phone = request.body.phone,
    message = request.body.message

    console.log('Sending Mail....');
    try {
      const mailMessage = {
          from: email,
          to: 'prospermaxwell901@gmail.com',
          subject: subject,
          text: `
Name: ${fullname}
Email Address: ${email}
Phone Number: ${phone}
${message}
                  `,
      }
    let MailInfo = await MailTransporter.sendMail(mailMessage);
    console.log('Email Sent...' + MailInfo.response)
    response.json({ message: 'Sent', MailResponse: MailInfo.response })
  }
  catch (error) {
    console.log('Error sending message', error)
    response.json({ message: 'Sorry we were unable to send your Mail. Please check your internet connection and try again', ErrorMEssage: error})
  }
})

router.post('/order-sent', async(request,response) => {
    const newData = {
        orderid: request.body.orderid,
        fullname: request.body.fullname,
        phone: request.body.phone,
        email: request.body.email,
        address: request.body.address
    },
    orderDetails = {
        DuckEggs: request.body.DuckEggs,
        ducks: request.body.ducks,
    }

    const dbPromise = new Promise((resolve, reject) => {
        let insertQuery = 'INSERT into all_orders SET ?'
    connection.query(insertQuery, newData, (err, result) => {
        if (err) {
            console.log('There is an error', err)
            resolve(false)
        }
        console.log('Data Added...', result)
        resolve(true)
    })
    })

        const MailOption = {
            from: newData.email,
            to: 'prospermaxwell901@gmail.com',
            subject: 'ORDER PLACED',
            text: `
ORDERID: ${newData.orderid}
Name: ${newData.fullname}
Mobile Number: ${newData.phone},
Email: ${newData.email},
Number of Duck Eggs Required: ${orderDetails.DuckEggs},
Number of Ducks Required: ${orderDetails.ducks}
            `
        }
let resolvementBool = await dbPromise;
       if (resolvementBool) {
            try {
                let NodeMail = await MailTransporter.sendMail(MailOption);
            console.log('Order has been placed...', NodeMail.response)
            response.json({ Status: 'Sent', message: 'Mail has been sent...', Response: NodeMail.response })
            }
            catch (error) {
                console.log('Error Sending Mail....', error)
                response.json({ Status: 'Sorry we\'re unable to send your order', message: 'Error Sending Message..', Error: error })
            }
        }
        else if (!resolvementBool) {
            response.json({ Status: 'DB error', message: 'Unable to add order to database...Please try again'})
        }

})

router.post('/freight-calculation', async (request, response) => {
    const clientName = request.body.clientName,
        clientPhone = request.body.clientPhone,
        clientEmail = request.body.clientEmail,
        packageWeight = request.body.packageWeight,
        deptCity = request.body.deptCity,
        arrCity = request.body.arrCity

    try {
        const clientMail = {
            from: clientEmail,
            to: 'prospermaxwell901@gmail.com',
            subject: 'FREIGHT CALCULATION BID',
            text: `
CLIENT FREIGHT CALCULATION BID
Client Name: ${clientName}
Client Phone: ${clientPhone}
Client Email: ${clientEmail}
Package Weight: ${packageWeight};
City Of Departure: ${deptCity};
City Of Arrival: ${arrCity}
            `,
        }
        let NodeMailResponse = await MailTransporter.sendMail(clientMail);
            console.log('Order Bid Sent..' +NodeMailResponse.response)
            response.json({ message: 'Sent', Response: NodeMailResponse.response })
    }
    catch (error) {
        console.log('Error Sending Message', error)
        response.json({ message: 'Mail has not been sent', Err: error})
    }
})

router.post('/track_order', (request,response) => {
    const orderid = request.body.orderid,
    trackQuery = 'SELECT orderStatus FROM all_orders WHERE orderid = ?';
    connection.query(trackQuery, [orderid], (trackErr, trackResult) => {
        if (trackErr) {
            console.log('Error encountered while tracking order', trackErr)
            response.json({ message: 'Error while getting track status from database', Error: trackErr })
        }
        else if (!trackResult.length > 0) {
            console.log('Order does not exist')
            response.json({ message: 'Order does not exists', results: trackResult})
        }
        else {
            console.log('Order exists', trackResult[0]);
            response.json({ message: 'Order Exists', Result: trackResult[0]})
        }
    })
})

module.exports = router;