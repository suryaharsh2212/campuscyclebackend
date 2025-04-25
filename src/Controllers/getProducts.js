import Product from "../Database/Models/ProductModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("ownedBy", "name email");
  
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
  
    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Server error while fetching products." });
  }
  
};
export default getProducts;