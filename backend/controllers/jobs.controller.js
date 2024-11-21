import Jobs from "../models/job.model";
import Company from "../models/company.model";

export const createJob = async (req, res) => {
    const { jobTitle, jobDescription, location, applyType, applyLink, companyId } = req.body; 

    try {
        const company = await Company.findById(companyId);
        
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        const newJob = new Jobs({
            company: company._id, 
            jobTitle,
            jobDescription,
            location,
            applyType,
            applyLink,
        });

        await newJob.save();

        const populatedJob = await Jobs.findById(newJob._id).populate("company", "companyName");

        res.status(201).json({ message: 'Job created successfully!', job: populatedJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating job post', error: error.message });
    }
};
