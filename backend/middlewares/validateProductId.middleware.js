const validateProductIdMiddleware = async (req, res, next) => {
    const productId = req.params.productId;
    if(!productId) {
        return res.status(404).json({
            message: 'Producto no existe.'
        })
    }
    if (productId.trim() < 0) {
        return res.status(404).json({
            message: 'Producto no existe.'
        })
    }
    next()
}
module.exports = validateProductIdMiddleware;