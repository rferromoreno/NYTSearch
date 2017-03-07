import request from 'request-promise';
import nytApiService from '../services/nyt.api.service';
import logger from "../logger";

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
        logger.log('error',`${module.id} - ${error}`);
        //console.error(error);
         // Manejar el errror de mejor manera
        res.send('Error');
    });
}