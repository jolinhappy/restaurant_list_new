const express = require('express')
const app = express()
const port = 3000

//mongoose setting
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})



app.get('/', (req, res) => {
  res.send('HIHI')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
