const mongoose = require('mongoose')
const Wish = require('./wish')
const { Schema } = mongoose

const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  wishes: [Wish.schema]
}, {
  timestamps: true
})

const Employee = mongoose.model('Employee', EmployeeSchema)

module.exports = Employee
