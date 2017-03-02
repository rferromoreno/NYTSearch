const express = require('express');
const ser = require('./services/nyt.api.service');

var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/search/:queryString/:startDate/:endDate', function(req, res) {
  // Llamada al service
  // Habria que verificar si estan bien los parametros
  // Quizas la logica de la validacion hay que ubicarla en otro lado
  ser.getNews(req.params.startDate, req.params.endDate, req.params.queryString)
    .then((data) => {
        console.log(data);
        res.send(data);
    }, (error)=>{
        console.log(error);
        res.send('Error');
    });

  //res.send();
});

app.get('*', function(req, res) {
  res.send('404. Not found.');
});


app.listen(3000,function(){
  console.log("Live at Port 3000");
});

