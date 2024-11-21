import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

export const createUser = async (req, res) => {
  const { name, email, password,role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }


  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role:role
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (e) {
    res.status(500).json({ message: "Server Error", error: e.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;

    const loggedInUser = await User.findById(loggedInUserId).populate("friends", "_id name");

    const friendIds = new Set(loggedInUser.friends.map(friend => friend._id.toString()));

    const users = await User.find({ _id: { $ne: loggedInUserId } })
      .populate('friends', '_id name') 
      .lean();  

    const usersWithFriendStatus = users.map(user => ({
      ...user,
      isFriend: friendIds.has(user._id.toString()),
    }));

    res.status(200).json(usersWithFriendStatus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};



export const loginUser = async(req,res) =>{
    const {email,password} = req.body

    if(!email || !password){
        res.status(400).json({message:"All fields are required"})
    }
    try {
        const user = await User.findOne({email})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({message:"Invalid password or email"})
        }

        if(!user){
            res.status(400).json({message:"Invalid password or email"})
            
        }
        const token = jwt.sign({userId:user._id,userName:user.name,email:user.email,role:user.role},JWT_SECRET,{
            expiresIn:"1h"
        })
        
        res.status(200).json({message:"login successfully",token})

    }catch(error){
        res.status(500).json({message:"internal server error"})
        console.log(error)
    }
    
}
export const updateUserRole = async (req, res) => {
  const { userId } = req.user.userId;
  const { newRole } = req.body;

  if (!newRole) {
    return res.status(400).json({ message: "Role is required" });
  }

  const validRoles = ["user", "recruiter",]; 
  if (!validRoles.includes(newRole)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = newRole;
    await user.save();

    res.status(200).json({ message: "Role updated successfully", role: newRole });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


