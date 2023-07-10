const mongoose = require("mongoose")
const RestaurantSchema = mongoose.Schema({
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    menu: [{
      name: String,
      description: String,
      price: Number,
      image: String
    }]
  }
  )

  module.exports = mongoose.model("Restaurant",RestaurantSchema)
  