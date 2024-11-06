import Company from "../models/company.model.js";

export const createCompany = async (req, res) => {
  const { companyName, companyType, location } = req.body;
  let companyLogo;

  try {
    if (req.file) {
      companyLogo = req.file.buffer;
    }

    const newCompany = new Company({
      companyName,
      companyType,
      location,
      companyLogo, 
    });

    await newCompany.save();

    res.status(200).json({ message: "Company created successfully" });

  } catch (error) {
    console.error('Error:', error);
    res.status(404).json({ message: "An error occurred", error: error.message });
  }
};
