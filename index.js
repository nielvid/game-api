const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const db = [{username: 'ade', email: 'ade@test.com', password: '1234567'}]

app.get('/users', (req, res)=>{
    res.send(db)
})

app.post('/login', (req, res) => {
   const user =  db.find((elem)=>{
        return elem.username == req.body.username
    })
    if(user.password != req.body.password){
        throw new Error('invalid password')
    }
  res.send(user)
})

app.post('/signup', (req, res) => {
  console.log(req.body, 'sjsjsjsjsjsj')
  db.push(req.body)

  res.send(req.body)
})

app.listen(8080,()=>{
    console.log('Server is running fine on port 80')
})