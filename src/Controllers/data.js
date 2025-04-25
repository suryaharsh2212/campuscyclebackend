import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../Database/Models/ProductModel.js";
import User from "../Database/Models/userModel.js";

dotenv.config(); // For .env access

const connectDB = async () => {
  try {
          const connection= await mongoose.connect(`${process.env.DATABASE_URL}`)
          console.log(`Database connected sucessfully ..............`)
      } catch (error) {
          console.log("Some error occured during conntecting..............",error.message);
      }
};

const seedProducts = async () => {
  await connectDB();

  const userId = "680b714b45636f138ce4b458"; // Replace with a valid ObjectId from your Users collection
  const userExists = await User.findById(userId);

  if (!userExists) {
    console.error("❌ Provided user ID does not exist in DB");
    process.exit(1);
  }

  const dummyProducts = [
    {
      name: "Casio Calculator",
      picture: "https://example.com/calculator.jpg",
      ownedBy: userId,
      description: "Scientific calculator in good condition.",
      price: 200,
      category: "Electronics",
      fitness: "Good",
      brand: "Casio",
    },
    {
      name: "Study Chair",
      picture: "https://example.com/chair.jpg",
      ownedBy: userId,
      description: "Comfortable chair with cushion.",
      price: 500,
      category: "Furniture",
      fitness: "Very Good",
      brand: "IKEA",
    },
  ];

  try {
    await Product.insertMany(dummyProducts);
    console.log("✅ Dummy products inserted!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error inserting dummy data:", error);
    process.exit(1);
  }
};

seedProducts();
