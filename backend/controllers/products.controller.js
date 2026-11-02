const Product = require("../models/products");

const create = async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();

  res.status(201).json(savedProduct);
};

const getAll = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

const getById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.status(200).json(product);
};

const update = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado para actualizar" });
  }
  res.status(200).json(product);
};

// No se permite "delete" como nombre de declaración de variable. Lo dejo acentado por las dudas.
const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado para eliminar" });
  }
  res.status(200).json({
    message: "Producto eliminado correctamente",
    product
  });
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteProduct
};
