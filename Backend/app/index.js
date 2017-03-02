const express = require('express');
const ser = require('./services/nyt.api.service');
const query = require('querystring');

var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/search/:queryString/:startDate/:endDate', function(req, res) {
  // Llamada al service
  // Quizas la logica de la validacion hay que ubicarla en otro lado
  // Si la query string es vacia no lo rutea por aca, sino que tira un 404

  //Se crea un arreglo con las distintas partes de la query
  let queryObj = query.parse(req.params.queryString); 
  let queryArr = Object.values(queryObj).map(function(value) {
        return value;
  });

  //"..." es el operador "spread" que separa un arreglo en elementos simples
  //Cada opción en la query(en el arreglo) se la pasa a getNews 
  //como un parámetro adicional
  ser.getNews(req.params.startDate, req.params.endDate, ...queryArr)
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

