const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    // password: {
    //     type: String,
    //     required: true
    // },
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
        last: String
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