'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class CourseDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.CourseDetail.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course',
      });
      models.CourseDetail.hasMany(models.Order, {as: 'order', foreignKey: 'courseDetail_id'})
    }
  }
  CourseDetail.init({
    course_id: { type: DataTypes.INTEGER, allowNull: false },
    videoUrl: { type: DataTypes.STRING, allowNull: false },
    material: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'CourseDetail',
  });
  return CourseDetail;
};