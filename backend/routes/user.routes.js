import express from "express"
import { createUser, getUsers, loginUser } from "../controllers/user.controller.js"
import { authenticateToken } from "../middlewares/auth.js"
const router =express.Router()

router.post("/create-user",createUser)
router.post("/login",loginUser)
router.get("/get-users",authenticateToken,getUsers)

export default router