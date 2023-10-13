import expressAsyncHandler from "express-async-handler";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = expressAsyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? {name : {$regex: req.query.keyword, $options: 'i'}} : {};

  const count = await Product.countDocuments({...keyword});


  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
  res.json({products, page, pages: Math.ceil(count / pageSize)});
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

//@desc   Create new review
//@route  POST /api/products/:id/reviews
//@access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Producto no encontrado");
  }

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Ya has valorado este producto");
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({ message: "Reseña agregada exitosamente" });
});

// @desc   Get top rated products
// @route  GET
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.status(200).json(products);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
