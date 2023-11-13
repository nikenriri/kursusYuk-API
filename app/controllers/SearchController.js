const { Course } = require('../models');
const { Op } = require('sequelize');

const searchCourses = async (req, res) => {
  const { query } = req.query;

  try {
    const results = await Course.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
          { category: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  searchCourses,
};
