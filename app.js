var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, '/public')));
var nunjucks = require('nunjucks');
var models = require('./models');

var router = require('./routes');

app.use(bodyParser.urlencoded({extended: true})); // for HTML form submissions
app.use(bodyParser.json()); // for AJAX requests
app.use('/', router);

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

// // make sure you are exporting your db from your models file
// models.db.sync({})
// .then(function () {
//     // make sure to replace the name below with your express app
//     yourExpressAppVar.listen(3000, function () {
//         console.log('Server is listening on port 3001!');
//     });
// })
// .catch(console.error);

// // // this drops all tables then recreates them based on our JS definitions
//models.User.sync({force: true})
// vs. models.db.sync({force: true})???

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
