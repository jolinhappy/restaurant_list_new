const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

const Restaurant = require('./models/restaurant')

//CSS setting
app.use(express.static('public'))

//mongoose setting
const mongoose = require('mongoose')
const restaurant = require('./models/restaurant')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//handlebars setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')



app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
