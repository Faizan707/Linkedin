import mongoose from "mongoose";
const {Schema}=mongoose
const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 

})

const User =mongoose.model("User",userSchema)
export default User