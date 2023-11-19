const { Checkout, Order, Cart, Course } = require('../models');
const orderStatus = require('../constants/orderStatus');

const createOrder = async (req, res) => {
    try {
      const carts = await Cart.findAll({
        where: { user_id: req.user.id },
        include: [{ model: Course, as: 'course', include: 'courseDetail' }], 
      });
  
      const price_total = carts.reduce((total, cart) => total + cart.price_total, 0);
  
      const newCheckout = await Checkout.create({ user_id: req.user.id, price_total, status: orderStatus.PENDING });

      for (const cart of carts) {
        await Order.create({ checkout_id: newCheckout.id, courseDetail_id: cart.course.courseDetail.id });
      }
        await Cart.destroy({ where: { user_id: req.user.id } });
  
      res.status(201).json({ checkout: newCheckout });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

const getOrder = async (req, res) => {
  try {
    const checkouts = await Checkout.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Order, as: 'order', include: 'courseDetail' }],
    });

    res.json(checkouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrder,
  deleteOrder,
};
