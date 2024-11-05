import express from "express"
import { databaseConnection } from "./config/db.js"
import UserRoutes from "./routes/user.routes.js"
import cors from "cors"
import dotenv from "dotenv"
 dotenv.config()

 const PORT = process.env.PORT
const app =express()
app.use(express.json())
app.use(cors())

app.use("/api/",UserRoutes)
databaseConnection()

app.listen(PORT,()=>{
    console.log("connect to port",PORT)
})