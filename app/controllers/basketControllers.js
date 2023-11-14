const { Basket, Checkout, Product} = require('../models');
//const Course = require('../models/course');

const addProduct = async (req, res) => {
  try{
    const { product_id } = req.body;
    const basketItems = await Basket.create({product_id});
    res.status(201).json({ basketItems });

  } catch (error) {
    console.error(error);
    res.status(500).son({ error: 'Failed to add product'})
  }
};

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
  getAllProductsFromBasket,
  addProduct
};
