const mongoose = require("mongoose")
const OrderSchema = mongoose.Schema({
    user : { type:mongoose.Types.ObjectId, ref: 'User' },
    restaurant : { type:mongoose.Types.ObjectId, ref: 'Restaurant' },
  items: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  totalPrice: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  status: String // e.g, "placed", "preparing", "on the way", "delivered"
})

module.exports = mongoose.model("Order",OrderSchema)