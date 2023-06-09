const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
  'mongodb://localhost:27017/user-authentication',
  () => console.log('Connected to the DB')
)


app.use('/user', require('./routes/authRouter.js'))             // prompts user to ether log in or signup to recieve a token in order to have access to the rest of the app 
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256']}))      //first expressJwt will be triggered to check for a token
app.use('/api/todo', require('./routes/todoRouter.js'))         // if token exists it will let user through to the rest of the app

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.listen(9000, () => {
  console.log(`Server is running on local port 9000`)
})