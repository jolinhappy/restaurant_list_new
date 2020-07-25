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

//bodyparser setting
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  console.log(req.body)
  const name = req.body.name
  const name_en = req.body.name_en
  const image = req.body.image
  const phone = req.body.phone
  const google_map = req.body.google_map
  const description = req.body.description
  return Restaurant.create({ name, name_en, image, phone, google_map, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
