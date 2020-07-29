const Restaurant = require('../restaurant')
const sampleList = require('../restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < sampleList.results.length; i++) {
    Restaurant.create(sampleList.results[i])
  }
  console.log('done')
})
