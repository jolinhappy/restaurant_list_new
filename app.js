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


//瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//create new restaurant page
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

//接收新增資料
app.post('/restaurants', (req, res) => {
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

//detail page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//接收修正的餐廳資料
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const image = req.body.image
  const phone = req.body.phone
  const google_map = req.body.google_map
  const description = req.body.description
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name,
        restaurant.name_en = name_en,
        restaurant.image = image,
        restaurant.phone = phone,
        restaurant.google_map = google_map,
        restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})






//search

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
