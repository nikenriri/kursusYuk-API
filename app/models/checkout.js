'use strict';
const {
  Model
} = require('sequelize');
const orderStatus = require('../constants/orderStatus')
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Checkout.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
      models.Checkout.hasMany(models.Order, { as: 'order', foreignKey: 'checkout_id' })
    }
  }
  Checkout.init({
    user_id:{ type: DataTypes.INTEGER, allowNull: false },
    price_total: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    status: { type: DataTypes.STRING, defaultValue: orderStatus.PENDING }
  }, {
    sequelize,
    modelName: 'Checkout',
  });
  return Checkout;
};