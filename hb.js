const express = require('express')
const app = express()
const server = require('http').createServer(app)
const path = require('path');
const bodyParser = require('body-parser')

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


require("./version/v1/constants/routes/display.routes")(app)

server.listen(9999, () => {
    console.log(`Server is running `)
})