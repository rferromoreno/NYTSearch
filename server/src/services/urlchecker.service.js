import request from 'request-promise';
import logger from "../logger";


exports.checkUrl = checkUrl;

/*
* Chequea si la url sigue existiendo:
*   devuelve un objeto promise que procesa si la url está activa.
*/
function checkUrl(url) {
    const options = {
        method : 'HEAD',
        uri : url,
        simple : false,
        resolveWithFullResponse : true,
        jar: true,
        headers: {
            'User-Agent': 'Request-Promise'
        },
    };

    return request(options)
            .then(process)
            .catch(handleError);
}

function process(response) {
    let isAlive = response.statusCode >= 200 &&
                    response.statusCode <= 299;

    logger.log('info',`${module.id} - method process - returns: ${isAlive}`);
    //console.log(`${module.id} - method process - returns: ${isAlive}`);
    return isAlive;
}

function handleError(error) {
    return logger.log('error',`${module.id} - ${error.message}`);
    //return console.error(`${module.id} - ${error.message}`);
}

