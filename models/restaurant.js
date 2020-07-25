const mongoose = require('mongoose')
const Schema = mongoose.Schema
restaurantSchema = new Schema({
  id: {
    type: Number,
    require: false,
  },
  name: {
    type: String,
    require: false,
  },
  name_en: {
    type: String,
    require: false,
  },
  category: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: false,
  },
  location: {
    type: String,
    require: false,
  },
  phone: {
    type: String,
    require: false,
  },
  google_map: {
    type: String,
    require: false,
  },
  rating: {
    type: Number,
    require: false,
  },
  description: {
    type: String,
    require: false,
  }

})

module.exports = mongoose.model('Restaurant', restaurantSchema)