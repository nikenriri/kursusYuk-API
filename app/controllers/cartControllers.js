const { Cart, Course } = require('../models');


const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.findAll({
      where: { user_id: req.user.id },
      include: ['course'],
    });
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addCourseCart = async (req, res) => {
  const { course_id, quantity } = req.body;

  const course = await Course.findByPk(course_id)

  try {
    const newCart = await Cart.create({ user_id: req.user.id, course_id, quantity, price_total: quantity * course.price });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};  

const deleteCourseCart = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    await cart.destroy();
    res.json({ message: 'Course deleted from cart successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCart,
  addCourseCart,
  deleteCourseCart,
};
