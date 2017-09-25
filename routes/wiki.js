var express = require('express');
var router = express();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 
var bodyParser = require('body-parser');

module.exports = router;

router.get('/', function(req, res, next) {
	res.redirect('/');
});

router.get('/add', function(req, res, next) {
	res.render('addpage');
});

router.post('/', function(req, res, next) {
 
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });


  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save();
  res.redirect('/');
});