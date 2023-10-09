import expressAsyncHandler from "express-async-handler";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Recurso no encontrado");
  }
});

// @desc   Create a product
// @route  POST /api/products
// @access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Vestido Marte",
    price: 15000,
    user: req.user._id,
    image: "/images/vestido_marte.jpeg",
    brand: "Mi Dulce Nido",
    category: "Chicas",
    countInStock: 4,
    numReviews: 5,
    description: "Tela Tusor de gran calidad",
  });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

//@desc   Update a product
//@route  PUT /api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Recurso no encontrado");
  }
});

//@desc   Delete a product
//@route  DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Producto Eliminado 🗑️" });
  } else {
    res.status(404);
    throw new Error("Recurso no encontrado");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
