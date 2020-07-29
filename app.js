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

require('./config/mongoose')

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
