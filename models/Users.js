'use strict';
module.exports = function (sequelize, DataTypes) {

  var bcrypt = require('bcrypt');
  var path = require('path');

  var Users = sequelize.define('Users', {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    username: DataTypes.CHAR(100),
    password: DataTypes.STRING,
    role: DataTypes.CHAR(20),
    email: {
      type: DataTypes.CHAR(100),
    },
  }, {
    getterMethods: {

    },
    classMethods: {
      generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      },

      associate: function (models) {
        // associations can be defined here
      },
    },
    instanceMethods: {
      validPassword: function (password) {
        return bcrypt.compareSync(password, this.password);
      },
      toJSON: function () {
        var values = Object.assign({}, this.get());
        delete values.password;
        return values;
      }
    },
  });
  return Users;
};
