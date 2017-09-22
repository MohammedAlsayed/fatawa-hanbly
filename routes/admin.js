var express = require('express');
var router = express.Router();
var path = require('path');
var rootPath = path.resolve('.');
var db = require(rootPath+'/config/database');


/* GET users listing. */
router.post('/add_category', function(req, res, next) {
  let name = req.body.name;
  db.Categories
      .create({
          name: name
      })
      .then(function (result) {
        res.send('done')
      })
});

router.post('/add_fatwa', function(req, res, next) {
  let title = req.body.title;
  let answer = req.body.answer;
  let userIdFK = req.body.userIdFK;
  let questionIdFK = req.body.questionIdFK;
  let categoryIdFK = req.body.categoryIdFK;

  db.Fatwas
      .create({
        title: title,
        answer: answer,
        userIdFK: userIdFK,
        questionIdFK: questionIdFK,
        categoryIdFK: categoryIdFK
      })
      .then(function (result) {
        res.send('done')
      })
      .catch(function (err) {
        res.send(err);
      })
});

router.post('/add_user', function (req, res, next) {
  const data = req.body;
  const username = data.username;
  const password = data.password;
  const role = data.role.toLowerCase();
  const status = data.status;
  const email = data.email;
  // const hashedPassword = db.Users.generateHash(password);

  db.Users
      .findOne({
        where: {
          username: username,
        },
      })
      .then(function (user) {
        if (user) {
          res.send( {message: 'username already exits'});
        } else {
          db.Users
              .create({
                username: username,
                password: password,
                role: role,
                status: status,
                email: email,
              })
              .then(function (result) {
                res.send("user created.")
              })
        }
      });
})

module.exports = router;
