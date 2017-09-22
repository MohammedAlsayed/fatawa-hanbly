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
        // var sequelize = new Sequelize(process.env[config.use_env_variable]);
        const sequelize = new Sequelize('mysql://b9d0c3d3c08bfd:e6ab8e95@us-cdbr-iron-east-05.cleardb.net/heroku_20376b4b6bbb06e?reconnect=true');
    } else {
      // var sequelize = new Sequelize( config.database, config.username, config.password,  {
      //     host: config.host,
      //     dialect: config.dialect
      //   });
        const sequelize = new Sequelize('mysql://b9d0c3d3c08bfd:e6ab8e95@us-cdbr-iron-east-05.cleardb.net/heroku_20376b4b6bbb06e?reconnect=true');
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
