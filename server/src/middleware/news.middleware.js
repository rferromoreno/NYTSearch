import request from 'request-promise';
import getNewsService from '../services/nyt.api.service';
import logger from "../logger";

export default
  function getNews(request, response, next) {
    // Revisar si la logica de la validación conviene ponerla acá o en otro lado.
    getNewsService( 
        decodeURIComponent(request.params.startDate), 
        decodeURIComponent(request.params.endDate), 
        decodeURIComponent(request.params.queryString)
    )
    .then((data) => {
        response.newsArray = data;
        next();
    })
    .catch((error) => {
        logger.error(`${module.id} - ${error}`);
        next(error);
    });
}