const express = require('express');
const ser = require('./services/nyt.api.service');
const newsMiddleWare = require('./middlewares/news.middleware');
const checkUrlMiddleware = require('./middlewares/urlchecker.middleware');

var app = express();

// get an instance of router
var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);   
    // continue doing what we were doing and go to the route
    next(); 
});

// home page route 
router.get('/', function(req, res) {
    res.send('hello world');
});

// Route for the Search API. Eg. /search/Argentina/20160101/20170101
router.get('/search/:queryString?/:startDate?/:endDate?', 
    newsMiddleWare,
    checkUrlMiddleware);

/*  Route to manage any other type of error.
    We will temporally manage this as a 404 error, no matter 
    if the error was in another status code.
*/
router.get('*', function(req, res) {
    res.send('404');
});


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// apply the routes to our application
app.use('/api', router);

app.listen(3001,function(){
  console.log("Live at Port 3001");
});

