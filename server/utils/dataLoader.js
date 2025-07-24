const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

const loadInitialProducts = async () => {
  try {
    const existingProductsCount = await Product.countDocuments();
    
    if (existingProductsCount === 0) {
      const productsFilePath = path.join(__dirname, '../products.json');
      const data = fs.readFileSync(productsFilePath, 'utf8');
      const products = JSON.parse(data);
      
      await Product.insertMany(products);
      console.log(`Inserted ${products.length} products into the database`);
    } else {
      console.log(`Database already contains ${existingProductsCount} products`);
    }
  } catch (error) {
    console.error('Error loading initial products:', error);
  }
};

module.exports = { loadInitialProducts };
