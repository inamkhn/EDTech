import express from "express"
import mongoose from 'mongoose'
import * as dotenv from 'dotenv' 
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cloudinary from 'cloudinary'
import cors from 'cors'
import messageRoute from './routes/messageRoute.js'
import conversationRoute from './routes/conversationRoute.js' 
import path from 'path';

const app = express()

cloudinary.v2.config({
  cloud_name:"ddmhueviv",
  api_key:"472164627215284",
  api_secret:"afGJ1MeZjKRCJy9I5saqh1Gf25E"
})


import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoute.js'
import paymentRouter from './routes/paymentRoute.js'
import ErrorMiddleware from "./middlewares/Error.js"


// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }

app.use(express.json())
dotenv.config()
app.use(ErrorMiddleware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
const __dirname = path.resolve();


app.use("/api/v1",courseRouter)
app.use("/api/v1",userRouter)
app.use("/api/v1",paymentRouter)
app.use("/api/v1",messageRoute)
app.use("/api/v1",conversationRoute)

class Errorhandler extends Error{
  constructor(message,statusCode){
    super(message)
    this.statusCode = statusCode
  }
}

app.get('/abc',(req,res,next)=>{
  return next(new Error("errorr message"))
})

app.use((req,res,err)=>{
  res.status(404).json({
    message:err.message
  })
})

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


app.listen(5000 ,()=>{
  connect();
    console.log("server is connected to 5000")
})




