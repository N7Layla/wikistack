var express = require('express');
var router = express();
var models = require('../models');
var Page = models.Page;
var User = models.User;
var bodyParser = require('body-parser');

module.exports = router;

router.get('/', function(req, res, next) {
	Page.findAll()
  .then(function(pages){
    //console.log('pages', pages)
    res.render('index', {pages});
  })
  .catch(next);
});

router.get('/add', function(req, res, next) {
	res.render('addpage');
});

router.post('/', function(req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  page.save().then(function(savedPage){
    res.redirect(savedPage.route);
  }).catch(next);
});

router.get('/:urlTitle', function (req, res, next) {
    //console.log('urlTitle: ', req.params.urlTitle);
    Page.findOne({
      where: {
        urlTitle: req.params.urlTitle
      }
    })
    .then(function(page){
      console.log(page);
      const variable = page.dataValues;

      res.render('wikipage', {page: variable});
    })
    .catch(next);
  });
