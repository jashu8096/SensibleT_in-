const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser= require('body-parser')
const transactionRouter = require('./router/transactionRouter')

const app = express()

const PORT = process.env.PORT || 5000 
dotenv.config()
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("mongoDB connected succssfully")
  })
  .catch((error)=>{
    console.log(`${error}`)
  })

app.use(express.json());  
app.use('/transactions',transactionRouter)
  app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`)
  })