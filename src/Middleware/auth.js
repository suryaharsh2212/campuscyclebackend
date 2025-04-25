
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../Database/Models/userModel.js";

const client = new OAuth2Client(process.env.CLIENT_ID);
const googleAuthController = async (req, res) => {
  try {
    const { token } = req.body;
    console.log("hotted", token);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    if (!ticket) {
      return res.status(401).json({ message: "Invalid Google token" });
    }
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name, picture });
    }

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      token: jwtToken,
      user: { email: user.email, name: user.name, picture: user.picture },
    });
  } catch (err) {
    console.error("Google auth failed", err);
    res.status(401).json({ message: "Invalid Google token" });
  }
};


export default googleAuthController;
