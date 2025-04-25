import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
  name: String,
  picture: String,
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
    description: String,
    price: Number,
    category: String,
    fitness: String,
    brand: String,
});

const Product = mongoose.model("Products", productSchema);
export default Product;
