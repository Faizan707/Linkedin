import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    companyName:{type:String,require:true},
    companyType:{type:String,require:true},
    companyLogo:{type:Buffer,require:true},
    location:{type:String,require:true}
})

const Company = mongoose.model("Company",companySchema) 
export default Company