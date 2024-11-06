import express from "express"
import { authenticateToken, checkRecruiterRole } from "../middlewares/auth.js"
import { createCompany } from "../controllers/company.controller.js"
import uploadFile from "../utils/multer.js"

const router = express.Router()

router.post("/create-company",authenticateToken,checkRecruiterRole,uploadFile('image').single('companyLogo'),createCompany)


export default router