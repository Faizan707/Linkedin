import Profile from "../models/profile.model.js";
import Company from "../models/company.model.js";

export const createProfile = async (req, res) => {
    const { about, education, university, currentPosition, location, companyId } = req.body;
    let profileImage, coverImage;

    try {
        const loggedInUserId = req.user.userId;

        if (req.files && req.files.profileImage) {
            profileImage = req.files.profileImage[0].buffer;
        }
        if (req.files && req.files.coverImage) {
            coverImage = req.files.coverImage[0].buffer;
        }

        const company = await Company.findOne({ _id: companyId }).populate("companyName");
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        const newProfile = new Profile({
            user: loggedInUserId,
            profileImage,
            coverImage,
            about,
            education,
            university,
            currentPosition,
            location,
            company: companyId
        });

        await newProfile.save();
        res.status(200).json({ message: "Profile created successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
};
