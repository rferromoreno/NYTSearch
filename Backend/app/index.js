const express = require('express');
const ser = require('./services/nyt.api.service');

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

router.get('/search/:queryString/:startDate/:endDate', function(req, res) {
    ser.getNews(req.params.startDate, req.params.endDate, req.params.queryString)
    .then((data) => {
        console.log(data);
        res.send(data);
    }, (error)=>{
        console.log(error);
        res.send('Error');
    });

});

router.get('*', function(req, res) {
    res.send('404');
});


// apply the routes to our application
app.use('/', router);

app.listen(3000,function(){
  console.log("Live at Port 3000");
});

