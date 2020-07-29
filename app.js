const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

//bodyparser setting
const bodyParser = require('body-parser')
//引入路由器
const routes = require('./routes')
//載入method-override入method-override
const methodOverride = require('method-override')


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
//CSS setting
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)



app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
