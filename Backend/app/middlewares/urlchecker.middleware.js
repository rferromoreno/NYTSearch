const request = require('request-promise');
const querystring = require('querystring');
const urlCheckerService = require('../services/urlchecker.service.js');

module.exports = checkUrlMiddleware;

function checkUrlMiddleware(request, response) {
    var data = response.newsArray;
    var promiseArray= [];

    //Aplico el servicio a cada noticia
    data.forEach((noticia) => {
        let promiseAv = urlCheckerService.checkUrl(noticia.web_url);

        promiseAv.then((isAvailable) => {
            noticia.isAvailable = isAvailable;
            return noticia;         
        }).catch(handleError);

        promiseArray.push(promiseAv);
    });

    //Resulevo todas las promesas a la vez
    Promise.all(promiseArray)
        .then((arrayResponse) => {         
            console.log(`${module.id} - Promise.all`);
           //foreach para generar un json acorde a lo que consume react

           var newsFormatedArray= [];

            data.forEach((noticia) => {
                    let aux={};
                    aux['url']=noticia.web_url;
                     aux['snippet']=noticia.snippet;
                      aux['title']=noticia.headline.main;
                       aux['isAvailable']=noticia.isAvailable;

                   
                
                newsFormatedArray.push(aux); 
               
                 });


            //Ya modifique 'data' en el forEach
            //return response.json(data);

            return response.json(newsFormatedArray);
        })
        .catch(handleError);
}

function handleError(error) {
    console.log(`${module.id} - ${error}`);
}