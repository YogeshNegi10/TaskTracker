import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import taskRouter from './routes/taskRoute.js';
import userRouter from './routes/userRoute.js';
import { ErrorMsge } from './utils/error.js';
import connectDb from './DB/dataBase.js';
import projectRouter from './routes/projectRoute.js';




//Using dotenv to access Environmental varialbles
dotenv.config();

const app = express();

//Connecting To Database
connectDb();


// Using all Middlewares here
app.use(express.json());
app.use(cookieParser())
app.use(cors({
     origin:[process.env.FRONTEND_URL,process.env.FRONTEND_URL2],
     methods:['GET','POST','PUT','DELETE'],
     credentials:true
}))
app.use("/api/v1/user",userRouter);
app.use("/api/v1/task",taskRouter);
app.use("/api/v1/project",projectRouter);

// Usinging ErrorMiddleware
app.use(ErrorMsge)


app.get('/',(req,res)=>{
      res.send('Api is working....')
})

app.listen(process.env.PORT,()=>{
   try {
        console.log(`Server is Listening on Port : ${process.env.PORT}`)
   } catch (error) {
        console.log("An Error occured",error)
   }
})