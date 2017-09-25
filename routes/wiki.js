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
    res.render('index', {pages});
  })
  .catch(next);
});


router.get('/add', function(req, res, next) {
	res.render('addpage');
});

router.post('/', function(req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.author_name,
      email: req.body.author_email
    }
  })
  .then(function (values) {
    var user = values[0];
    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });
    return page.save().then(function (page) {
      return page.setAuthor(user);
    });
  })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(next);
});

router.get('/:urlTitle', function (req, res, next) {
Page.findOne({
    where: {
        urlTitle: req.params.urlTitle
    },
    include: [
        {model: User, as: 'author'}
    ]
})
.then(function (page) {
    // page instance will have a .author property
    // as a filled in user object ({ name, email })
    if (page === null) {
        res.status(404).send();
    } else {
        res.render('wikipage', {
            page: page
        });
    }
})
.catch(next);
  });


