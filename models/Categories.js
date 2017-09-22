'use strict';
module.exports = function (sequelize, DataTypes) {
  var Categories = sequelize.define('Categories', {
    categoryId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: DataTypes.CHAR(40),
      allowNull: false,
    },
    parentIdFK: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'categoryId'
      },
    }
  }, {
    getterMethods: {

    },
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        Categories.hasMany(models.Fatwas, {
          foreignKey: 'categoryIdFK',
        });
      },
    },
    instanceMethods: {
    }
  });
  return Categories;
};
