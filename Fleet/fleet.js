const express = require('express')
var bodyParser = require('body-parser')
const app = express()
var cors = require('cors')
const port = 8080

const  { JsonDB } = require('node-json-db')

const db = new JsonDB("FleetState/db", true, false)

db.push('/', {})

// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res) => {
  res.send({ hello: true })
})

app.get('/positions', (req, res) => {
    res.send(db.getData('/'))
})

app.get('/update', (req, res) => {
    var vin = req.query.vin
    var long = req.query.long
    var lat = req.query.lat

    db.push('/' + vin + ':', [long, lat])

    res.send({ ok: true })
})



app.listen(port, () => {
  console.log(`Fleet app listening on port ${port}`)
})
