import request from 'request-promise';
import logger from "../logger";

/*
* Chequea si la url sigue existiendo:
*   devuelve un objeto promise que procesa si la url está activa.
*/

export default
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
    let isAlive = checkIfStatusOk(response.statusCode)

    logger.info(`${module.id} - method process - returns: ${isAlive}`);
    return isAlive;
}

function handleError(error) {
    logger.error(`${module.id} - ${error.message}`);
    return error;
}

function checkIfStatusOk(status) {
    return status >= 200 && status <= 299;
}

