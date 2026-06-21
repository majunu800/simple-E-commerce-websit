const express = require('express');
const Order = require('../models/Order');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { items, total } = req.body;
  const order = await Order.create({ user: req.user._id, items, total });
  res.status(201).json(order);
});

router.get('/', auth, async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { user: req.user._id };
  const orders = await Order.find(filter).populate('items.product');
  res.json(orders);
});

router.get('/:id', auth, async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (req.user.role !== 'admin' && !order.user.equals(req.user._id)) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  res.json(order);
});

router.put('/:id/status', auth, adminOnly, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

module.exports = router;
