import request from 'request-promise';
import getNewsService from '../services/nyt.api.service';
import logger from "../logger";

export default
  function getNews(request, response, next) {
    // Revisar si la logica de la validación conviene ponerla acá o en otro lado.
    getNewsService( 
        request.params.startDate, 
        request.params.endDate, 
        request.params.queryString
    )
    .then((data) => {
        response.newsArray = data;
        next();
    })
    .catch((error) => {
        logger.log('error',`${module.id} - ${error}`);
        next(error);
    });
}