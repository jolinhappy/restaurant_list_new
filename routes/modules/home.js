const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//瀏覽全部餐廳(首頁路由部分)
router.get('/', (req, res) => {
  const sortby = '排序'
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants, sortby }))
    .catch(error => console.log(error))
})

module.exports = router