'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Course.hasOne(models.CourseDetail, {
        foreignKey: 'course_id',
        as: 'courseDetail',
      });
    }
  }
  Course.init({
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};