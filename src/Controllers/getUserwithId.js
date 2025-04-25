import User from "../Database/Models/userModel.js";
const getUserbyId = async (id) => {
  const userId = id; 
  console.log("User ID:", userId);

  try {
    const user = await User.findById(userId); 

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return the user details
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ message: "Server error while fetching user." });
  }
}
export default getUserbyId;