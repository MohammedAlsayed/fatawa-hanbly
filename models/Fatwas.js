'use strict';
module.exports = function (sequelize, DataTypes) {
  var Fatwas = sequelize.define('Fatwas', {
    fatwaId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    title: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userIdFK: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'Users',
        key: 'userId'
      },
    },
    questionIdFK: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'Questions',
        key: 'questionId'
      },
    },
    categoryIdFK: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'Categories',
        key: 'categoryId'
      },
    },
  }, {
    getterMethods: {

    },
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        Fatwas.belongsTo(models.Users, {
          foreignKey: 'userIdFK',
        });
        Fatwas.belongsTo(models.Questions, {
          foreignKey: 'questionIdFK',
        });
        Fatwas.belongsTo(models.Categories, {
          foreignKey: 'categoryIdFK',
        });
      },
    },
    instanceMethods: {
    }
  });
  return Fatwas;
};
