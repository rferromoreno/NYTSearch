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

// Route for the Search API. Eg. /search/Argentina/20160101/20170101
router.get('/search/:queryString?/:startDate?/:endDate?', function(req, res) {
    // Revisar si la logica de la validación conviene ponerla acá o en otro lado.

   ser.getNews(req.params.startDate, req.params.endDate, req.params.queryString)
    .then((data) => {
        res.json(data);
    }, (error)=>{
        // Si falta alguno de los parametros va a entrar por acá. 
        // Manejar el errror.

        console.log(error);
        res.send('Error');
    });

});

/*  Route to manage any other type of error.
    We will temporally manage this as a 404 error, no matter 
    if the error was in another status code.
*/
router.get('*', function(req, res) {
    res.send('404');
});

// apply the routes to our application
app.use('/', router);

app.listen(3000,function(){
  console.log("Live at Port 3000");
});

