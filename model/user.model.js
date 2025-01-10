const mongoose  = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },

  password: {
    type: String,
  },

  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
})

Schema.pre('save', function(next){
    if(this.password){
        this.password = bcrypt.hashSync(this.password, 10)
    }
    next()
})
Schema.set('toJSON', {
    transform: function(doc, user, opt){
        delete user.password,
         delete user.password,
        user.id = user._id;
        delete user._id
        delete user.__v
        return user
    }
})

const User = mongoose.model('users', Schema)
module.exports = User