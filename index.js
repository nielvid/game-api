const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./model/user.model')
const app = express()
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')

dotenv.config()

app.use(cors())
app.use(express.json())




app.post('/users', async (req, res) => {
  const user = await User.create({ ...req.body })
  res.send(user)
})
app.post('/users/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if(!user){
      res.status(400).send('user not found')
    }
    const validPassword = bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      throw new Error('invalid password')
    }
  res.send(user)
})
app.get('/users', async (req, res) => {
  const users = await User.find({})
  res.send(users)
})

app.get('/users/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username})
  if (!user) {
    res.status(400).send('user not found')
  }
  
  
  res.send(user)
})

app.patch('/users/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username})
  if (!user) {
    res.status(400).send('user not found')
  }
   const updateduser = await User.findOneAndUpdate(
     { username: req.params.username},
     { ...req.body },
     { new: true }
   )
  
  res.send(updateduser)
})




const PORT = process.env.PORT || 8080


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected')
    app.listen(PORT, () => {
      console.log('Server is running fine on port 80')
    })
  })
  .catch((err) => {
    console.log('cannot connect to database', err)
  })
