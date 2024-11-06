import express from "express"
import { getAllFriendRequests, sendFriendRequest } from "../controllers/request.controller.js"
import { authenticateToken } from "../middlewares/auth.js"
const router = express.Router()

router.post("/friend-requests", authenticateToken, sendFriendRequest);

router.get("/get-all-requests",authenticateToken,getAllFriendRequests)
export default router