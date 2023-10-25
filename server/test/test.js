const express = require('express')
const testApp = express()
const http = require('http')

http.createServer(testApp)

testApp.get('/', (req, res) => {
    res.json({ message: 'Server Working....'})
})