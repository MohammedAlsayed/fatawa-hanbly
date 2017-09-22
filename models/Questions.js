'use strict';
module.exports = function (sequelize, DataTypes) {
  var Questions = sequelize.define('Questions', {
    questionId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: DataTypes.CHAR(40),
      allowNull: true
    },
    mobileNumber: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    email: {
      type: DataTypes.CHAR(100),
    },
    title: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answered: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }

  }, {
    getterMethods: {

    },
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        Questions.hasOne(models.Fatwas, {
          foreignKey: 'questionIdFK',
        });
      },
    },
    instanceMethods: {
    }
  });
  return Questions;
};
