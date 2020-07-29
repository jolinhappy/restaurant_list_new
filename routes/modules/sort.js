const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


//sort setting
router.get('/:option/:sort', (req, res) => {
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


module.exports = router