const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//search
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const sortby = '排序'
  Restaurant.find({ name: { $regex: keyword, $options: "i" } })
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants, keyword, sortby: sortby }))
    .catch(error => console.log(error))
})

module.exports = router