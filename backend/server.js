import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import dbConnect from './config/db.js'

dotenv.config()
dbConnect();


const app = express()

app.use(express.json())
app.use(cors({
    origin: "*", credentials: true
}))

app.get('/',(_,res)=> res.send("api running"))


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port : ${PORT}`);
})