const Product = require("../models/products");

const create = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
     console.error(error)
    res.status(400).json({ message: "Error al crear el producto", error: error.message });
  }
};

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
};

const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar el producto", error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado para actualizar" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar el producto",
      error: error.message,
    });
  }
};

// No se permite "delete" como nombre de declaración de variable. Lo dejo acentado por las dudas.
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado para eliminar" });
    }
    res.status(200).json({ 
      message: "Producto eliminado correctamente", 
      product 
    });
  } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteProduct
};
