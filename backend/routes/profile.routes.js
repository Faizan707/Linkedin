import express from "express"
import { authenticateToken } from "../middlewares/auth.js"
import uploadFile from "../utils/multer.js"
import { createProfile } from "../controllers/profile.controller.js";

const router = express.Router()


router.post(
  "/create-profile",
  authenticateToken,
  uploadFile("image").fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  createProfile
);

export default router