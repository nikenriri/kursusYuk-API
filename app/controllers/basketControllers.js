const { Basket, Checkout, Product} = require('../models');

const getAllProductsFromBasket = async (req, res) => {
  try {
    const basketItems = await Basket.findAll({
      attributes: ['basket_id', 'user_id', 'product_id']
    });

    res.status(200).json({ basketItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch items from the basket' });
  }
};


module.exports = {
  getAllProductsFromBasket
};
