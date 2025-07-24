const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

router.get('/', (req, res) => {
  res.json({
    message: 'OnlineShop API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders'
    }
  });
});

module.exports = router;
