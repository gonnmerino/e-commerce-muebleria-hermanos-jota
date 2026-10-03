const products = require('../data/products.json');

const getAll = (req, res) => {
    res.json(products);
}

const getById = (req, res) => {
    const { productId } = req.params;
    console.log(productId);
    const product = products.find(product => product.id === parseInt(productId));
    if (!product) {
        return res.status(404).json({ message: 'Producto no existe.' });
    }
    res.json(product);
}

module.exports = {
    getAll,
    getById,
}