const mongoose = require('mongoose');
const Product = require('./models/products');
const products = require('./data/products.json');

async function seed() {
await mongoose.connect(process.env.MONGO_URI);

await Product.deleteMany({});

const newProducts = await Product.insertMany(products);
console.log(`🌱 ${newProducts.length} productos cargados en ${mongoose.connection.name}`);

await mongoose.disconnect();
}

seed().catch((error) => {
console.error(':x: Falló el seed:', error.message);
process.exit(1);
});