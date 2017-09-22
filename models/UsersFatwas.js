'use strict';
module.exports = function (sequelize, DataTypes) {
  var UsersFatwas = sequelize.define('UsersFatwas', {
    fatwaIdFK: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      unique: 'compositeIndex',
      references: {
        model: 'Fatwas',
        key: 'fatwaId'
      },
    },
    userIdFK: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      unique: 'compositeIndex',
      references: {
        model: 'Users',
        key: 'userId'
      },
    },
  }, {
    getterMethods: {

    },
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      },
    },
    instanceMethods: {
    }
  });
  UsersFatwas.removeAttribute('id');
  return UsersFatwas;
};
