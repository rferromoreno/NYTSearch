const request = require('request-promise');
const nytApiService = require('../services/nyt.api.service');

module.exports = getNews;

function getNews(request, response, next) {
    // Revisar si la logica de la validación conviene ponerla acá o en otro lado.

   nytApiService.getNews(request.params.startDate, 
                        request.params.endDate, 
                        request.params.queryString)
    .then((data) => {
        response.newsArray = data;
        next();
    })
    .catch((error)=> {
        // Si falta alguno de los parametros va a entrar por acá. 
        // Manejar el errror.
        console.error(error);
        res.send('Error');
    });
}