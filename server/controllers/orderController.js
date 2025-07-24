const Order = require('../models/Order');

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createOrder: async (req, res) => {
    try {
      const order = new Order(req.body);
      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getOrdersByCustomer: async (req, res) => {
    try {
      const { email } = req.params;
      const orders = await Order.find({ 'customerInfo.email': email }).sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = orderController;
