const express = require('express');
const {getById, getAll, create, deleteProduct, update} = require("../controllers/products.controller");
const router = express.Router();

router.post('/', create)
router.get('/', getAll)
router.get('/:id', getById)
router.patch('/:id', update)
router.delete('/:id', deleteProduct)

module.exports = router;
