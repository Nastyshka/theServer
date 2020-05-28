const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queriesMongoDB')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    }))
// app.get('/', (request, response) => {
//
//     response.json({
//         hello_world: 'Witness the server!'
//     })
// })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.get('/', db.createSessionStart)
app.get('/players', db.getPlayers)
app.get('/player/:id', db.getPlayer)
app.post('/players', db.createPlayer)
app.post('/startSession', db.createSessionStart)
app.post('/endSession', db.updateSessionEnd)