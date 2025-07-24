const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const connectDB = require('./config/database');

const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(() => {
  loadInitialProducts();
});

async function loadInitialProducts() {
  try {
    const existingProductsCount = await Product.countDocuments();
    
    if (existingProductsCount === 0) {
      const productsFilePath = path.join(__dirname, 'products.json');
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
}

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const order = new Order(orderData);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/products/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

