const { Checkout, Order, Cart, Course } = require('../models');
const orderStatus = require('../constants/orderStatus');

const createOrder = async (req, res) => {
    try {
      // Assuming user_id is available in the request object based on authentication middleware
      // Fetch all carts for the user
      const carts = await Cart.findAll({
        where: { user_id: req.user.id },
        include: [{ model: Course, as: 'course', include: 'courseDetail' }], // Include courseDetail information
      });
  
      // Calculate the total price based on the sum of price_total from the carts
      const price_total = carts.reduce((total, cart) => total + cart.price_total, 0);
  
      // Create a new checkout with the calculated total price
      const newCheckout = await Checkout.create({ user_id: req.user.id, price_total, status: orderStatus.PENDING });
  
      // Move cart items to the order
      for (const cart of carts) {
        // Assuming that courseDetail information is available as cart.course.courseDetail
        await Order.create({ checkout_id: newCheckout.id, courseDetail_id: cart.course.courseDetail.id });
      }
  
      // Clear the user's cart after creating the order
      await Cart.destroy({ where: { user_id: req.user.id } });
  
      res.status(201).json({ checkout: newCheckout });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

const getOrder = async (req, res) => {
  try {
    // Fetch all checkouts and their associated orders
    const checkouts = await Checkout.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Order, as: 'order', include: 'courseDetail' }],
    });

    res.json(checkouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrder,
};
