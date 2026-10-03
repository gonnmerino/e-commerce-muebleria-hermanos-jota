const express = require('express');
const {getById, getAll} = require("../controllers/products.controller");
const validateProductId = require("../middlewares/validateProductId.middleware");
const router = express.Router();

router.get('/', getAll)
router.get('/:productId', validateProductId, getById)

module.exports = router;
