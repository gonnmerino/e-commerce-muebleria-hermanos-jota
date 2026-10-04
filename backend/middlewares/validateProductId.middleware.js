const validateProductIdMiddleware = async (req, res, next) => {
    const productId = req.params.productId;
    const idParsed = Number.isInteger(Number(productId));
    if(isNaN(idParsed) || idParsed <= 0) {
        return res.status(404).json({
            message: 'Producto no existe.'
        })
    }
    next()
}
module.exports = validateProductIdMiddleware;