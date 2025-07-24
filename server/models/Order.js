const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerInfo: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      street: {
        type: String,
        required: true,
        trim: true
      },
      city: {
        type: String,
        required: true,
        trim: true
      },
      zipCode: {
        type: String,
        required: true,
        trim: true
      },
      country: {
        type: String,
        required: true,
        trim: true
      }
    }
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    size: {
      type: String,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
