const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

const Restaurant = require('./models/restaurant')
//載入method-override入method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
//CSS setting
app.use(express.static('public'))

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

//handlebars setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//bodyparser setting
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))


//瀏覽全部餐廳
app.get('/', (req, res) => {
  const sortby = '排序'
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants, sortby }))
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
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
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
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delet POST
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(restaurant => res.redirect('/'))
    .catch(error => console.log(error))
})


//search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const sortby = '排序'
  Restaurant.find({ name: { $regex: keyword, $options: "i" } })
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants, keyword, sortby: sortby }))
    .catch(error => console.log(error))
})

//sort setting
app.get('/sort/:option/:sort', (req, res) => {
  const sortby = {
    nameasc: '餐廳名稱(A->Z)',
    namedesc: '餐廳名稱(Z->A)',
    categoryasc: '類別',
    locationasc: '地區'
  }
  const name = req.params.option
  const sort = req.params.sort
  const selected = `${name}${sort}`
  Restaurant.find()
    .lean()
    .sort({ [name]: sort })
    .then(restaurants => res.render('index', { restaurants, sortby: sortby[selected] }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
