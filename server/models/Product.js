const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  sizes: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema, 'final_EliyahuAlhazov_MichaelMiron');

module.exports = Product;
