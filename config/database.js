/**
 * Created by alsayed on 3/6/17.
 */
    var Sequelize = require('sequelize');
    var fs        = require('fs');
    var path      = require('path');
    var basename  = path.basename(module.filename);
    var env       = process.env.NODE_ENV || 'development';
    var config    = require('./config.json')[env];
    var root = path.resolve('.');
    var db = {};
    var session    = require('express-session');

    if (config.use_env_variable) {
        var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
        console.log(213);
      var sequelize = new Sequelize( config.database, config.username, config.password,  {
          host: config.host,
          dialect: config.dialect
        });
    }

    // adding the models to the db variable
    fs
        .readdirSync(root + '/models/')
        .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
          })
        .forEach(function (file) {
            var model = sequelize['import'](path.join(root + '/models/', file));
            db[model.name] = model;
          });

    Object.keys(db).forEach(function (modelName) {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });
    sequelize.sync();

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;


module.exports = db;
