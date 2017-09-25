var express = require('express');
var router = express();

var user = require('./user');
var wiki = require('./wiki');

router.use('/wiki', wiki);
router.use('/users', user);

module.exports = router;