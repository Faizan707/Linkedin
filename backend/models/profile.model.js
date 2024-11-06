import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    profileImage: { type: Buffer },
    coverImage: { type: Buffer },
    about: String,
    education: String,
    university: String,
    currentPosition: String,
    location: {
        country: { type: String },
        city: { type: String }
    },
    company: { type: mongoose.SchemaTypes.ObjectId, ref: "Company" }
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
