import dotenv from 'dotenv'
import mongoose from 'mongoose'

//Using dotenv to access Environmental varialbles
dotenv.config();
//Function To Connect with Datatbase
const connectDb= () =>{

   mongoose.connect(process.env.MONGO_URI,{
      dbName:'TaskTracker',
    }).then(()=>{
        console.log(`DB Connected...`)
    }).catch((err)=>{
        console.log(err)
    })
}

export default connectDb;