const Product = require('../models/Product');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getProductById: async (req, res) => {
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
  },

  searchProducts: async (req, res) => {
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
  },

  createProduct: async (req, res) => {
    try {
      const product = new Product(req.body);
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = productController;
