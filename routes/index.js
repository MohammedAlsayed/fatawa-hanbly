var express = require('express');
var router = express.Router();
var sanitizer = require('sanitizer');
var path = require('path');
var rootPath = path.resolve('.');
var db = require(rootPath+'/config/database');
var marked = require('marked');
var renderer = new marked.Renderer();

renderer.paragraph = function(text) {
    return text;
};

marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

/* GET home page. */
router.get('/', function(req, res, next) {
    let fatwas;
    let categories;
    db.Fatwas
        .findAll({ limit: 10 })
        .then(function (result) {
            fatwas = result;
            return db.Categories
                .findAll({limit: 10})
        })
        .then(function (result) {
            categories = result;
            res.render('index', { fatwas: fatwas, categories: categories });
        })

});

router.get('/ask_question', function (req, res, next) {
  res.render('askQuestion', {success: false, failed: false} )
});

router.post('/ask_question', function (req, res, next) {
  let name = marked(req.body.name)
  let mobileNumber = marked(req.body.mobile_number);
  let email = marked(req.body.email);
  let title = marked(req.body.title);
  let question = marked(req.body.question);
  db.Questions
      .create({
        name: name,
        mobileNumber: mobileNumber,
        email: email,
        title: title,
        question: question
      })
      .then(function (result) {
        req.flash('success', 'تم ارسال الرسالة بنجاح');
        res.render('askQuestion', {success: req.flash('success'), failed: false});
      })
      .catch(function (err) {
        req.flash('failed', 'حدث خطأ نرجو المحاولة مرة أخرى');
        res.render('askQuestion', {success: false, failed: req.flash('failed')});
      });


});


router.get('/fatwa_answer/:fatwaId', function (req, res, next) {
    let elements = {};
    elements.fatwaId = req.params.fatwaId;
    let categoryId;
    db.Fatwas
        .findById(elements.fatwaId)
        .then(function (fatwa) {
            elements.title = fatwa.title;
            elements.answer = fatwa.answer;
            let date = fatwa.createdAt.toISOString().slice(0, 10).replace(/-/g, "/");
            categoryId = fatwa.categoryIdFK;
            elements.date = date;
            return db.Questions
                .findById(fatwa.questionIdFK)
        })
        .then(function (ques) {
            elements.question = ques.question;
            return db.Categories
                .findById(categoryId)
        })
        .then(function (category) {
            res.render('fatwaAnswer', {fatwa: elements, category: category});
        })
});


router.get('/category/:categoryId', function (req, res, next) {
    let page = req.query.page ? req.query.page : 1;
    let limit = 3;
    let offset = (page-1) * limit;
    let elements = {};
    elements.categoryId = req.params.categoryId;
    elements.page = page;
    db.Categories
        .findById(elements.categoryId)
        .then(function (category) {
            elements.categoryName = category.name;

            return db.Fatwas
                .findAndCountAll({
                    where:{
                        categoryIdFK: elements.categoryId
                    },
                    limit: limit,
                    offset: offset
                })
        })
        .then(function (fatwas) {
            elements.pages = Math.ceil(fatwas.count / limit);
            res.render('category ', {elements: elements, fatwas: fatwas.rows})
        })
});


module.exports = router;
