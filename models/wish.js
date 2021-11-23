const mongoose = require('mongoose')
const { Schema } = mongoose

const WishSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true
})

const Wish = mongoose.model('Wish', WishSchema)

module.exports = Wish
