'use strict';
module.exports = function (sequelize, DataTypes) {
  var Sessions = sequelize.define('Sessions', {
    sid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    data: DataTypes.TEXT,
    expires: DataTypes.DATE,
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      },
    },
  });
  return Sessions;
};