'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Order.belongsTo(models.Checkout, { foreignKey: 'checkout_id', as: 'checkout' });
      models.Order.belongsTo(models.CourseDetail, { foreignKey: 'courseDetail_id', as: 'courseDetail' });
    }
    
  }
  Order.init({
    checkout_id: { type: DataTypes.INTEGER, allowNull: false },
    courseDetail_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,  
    modelName: 'Order',
  });
  return Order;
};