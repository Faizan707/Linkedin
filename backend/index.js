import express from "express"
import { databaseConnection } from "./config/db.js"
import UserRoutes from "./routes/user.routes.js"
import RequestRoutes from "./routes/request.routes.js"
import CompanyRoutes from "./routes/company.routes.js"
import cors from "cors"
import dotenv from "dotenv"

 dotenv.config()

 const PORT = process.env.PORT
const app =express()
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.use("/api/",UserRoutes)
app.use("/api/",RequestRoutes)
app.use("/api/",CompanyRoutes)
databaseConnection()

app.listen(PORT,()=>{
    console.log("connect to port",PORT)
})