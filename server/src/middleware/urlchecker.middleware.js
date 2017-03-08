import request from 'request-promise';
import checkUrl from '../services/urlchecker.service.js';
import logger from "../logger";

export default
  function checkUrlMiddleware(request, response, next) {
    let data = response.newsArray;
    let promiseArray = [];

    //Aplico el servicio a cada noticia
    data.forEach((noticia) => {
        let promiseAv = checkUrl(noticia.web_url);

        promiseAv.then((isAvailable) => {
            noticia.isAvailable = isAvailable;
            return noticia;         
        })
        .catch(handleError);

        promiseArray.push(promiseAv);
    });

    //Resulevo todas las promesas a la vez
    Promise.all(promiseArray)
        .then((arrayResponse) => {         
            logger.log('info',`${module.id} - Promise.all`);
           
           //Generar un json acorde a lo que consume react
            let newsFormatedArray= [];

            data.forEach((noticia) => {
                let aux = {};
                aux['url'] = noticia.web_url;
                aux['snippet'] = noticia.snippet;
                aux['title'] = noticia.headline.main;
                aux['isAvailable'] = noticia.isAvailable;
                newsFormatedArray.push(aux);    
            });

            return response.json(newsFormatedArray);
        })
        .catch(handleError);
}

function handleError(error) {
    //console.log(`${module.id} - ${error}`);
    logger.log('error',`${module.id} - ${error}`);
    next(error);
}