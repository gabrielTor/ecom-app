const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    socialMedia:{
      facebook: String,
      instagram: String,
      twitter: String,
      LinkedIn: String
    },

    admin: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    ratedProductId: [String],
    favorites: [String],
    name: {
      first: String,
      last: String,
      dni: Number,
      phone: Number,
      address: String,
      about: String
      }
    }, {
    virtuals: {
        fullName: {
          get() {
            return this.name.first + ' ' + this.name.last;
          }
        }
    }
})

module.exports = mongoose.model('User', userSchema)