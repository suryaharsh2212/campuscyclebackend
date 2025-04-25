import User from "../Database/Models/userModel.js";  

const getUser = async (req, res) => {
  try {
    const users = await User.find();  // This fetches all users, you can also use .select('field1 field2') to limit fields
    console.log("Fetched users:", users);
    
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    // Return the list of users
    return res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Server error while fetching users." });
  }
};

export default getUser;
