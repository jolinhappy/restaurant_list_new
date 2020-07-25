const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const sampleList = require('../restaurant.json')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < sampleList.results.length; i++) {
    Restaurant.create(sampleList.results[i])
  }
  console.log('done')
})
