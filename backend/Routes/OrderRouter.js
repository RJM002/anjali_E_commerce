const express=require('express');
const ensureAdminAuthentication = require('../Middlewares/AdminAuth');

const router=express.Router();


router.post('/orders', ensureAdminAuthentication, async (req, res) => {
    const order = new Order({
      user: req.user.id,
      products: req.body.products,
      totalAmount: req.body.totalAmount
    });
    try {
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get all orders for a user
  router.get('/orders', ensureAdminAuthentication, async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user.id }).populate('products');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports=router;
  