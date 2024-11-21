import mongoose from "mongoose";

const applicantDataSchema = new mongoose.Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }, 
    resume: { type: String }, 
    coverLetter: { type: String }, 
});

const jobSchema = new mongoose.Schema({
    company: { type: mongoose.SchemaTypes.ObjectId, ref: "Company" }, 
    jobTitle: { type: String },
    jobDescription: { type: String },
    location: { type: String },
    applyType: { type: String, enum: ['link', 'form'], required: true }, 
    applyLink: { type: String }, 
    applicants: [applicantDataSchema], 
    createdAt: { type: Date, default: Date.now }
});

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;
