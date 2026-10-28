const products = require('../data/products.json');
const { ConnectDB } = require("../db");
// const Product = require("../models/products");

const getAll = (req, res) => {
  res.json(products)
}
/* 
const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos de la base de datos",
      error: error.message,
    });
  }
};*/

const getById = (req, res, next) => {
  try {
    const { productId } = req.params;
    //console.log(productId);
    const product = products.find(
      (product) => product.id === parseInt(productId),
    );
    if (!product) {
      return res.status(404).json({ message: "Producto no existe." });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
};
