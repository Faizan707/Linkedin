import dontenv from "dotenv"
import mongoose from "mongoose";
dontenv.config();

export const databaseConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to database")
    }catch(e){
        console.log(e.error)

    }
}
