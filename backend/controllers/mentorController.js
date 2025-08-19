import Mentor from "../models/mentor.js";

export const getMentors = async (req, res) => {
  try {
    // ✅ Only select fields you actually need (better performance)
    const mentors = await Mentor.find().select("userId name profilePhoto currentJob price rating bio");

    // ✅ Handle empty results
    if (!mentors.length) {
      return res.status(404).json({ success: false, message: "No mentors found" });
    }

    return res.status(200).json({ success: true, count: mentors.length, mentors });
  } catch (error) {
    console.error("❌ Error fetching mentors:", error.message);
    return res.status(500).json({ success: false, message: "Server error, please try again later." });
  }
};
