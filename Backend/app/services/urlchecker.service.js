const request = require('request-promise');

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
        resolveWithFullResponse : true
    };

    return request(options)
            .then(process)
            .catch(handleError);
}

function process(response) {
    let isAlive = response.statusCode >= 200 &&
                    response.statusCode <= 299;

    console.log(`${module.id} - method process - returns: ${isAlive}`);
    return isAlive;
}

function handleError(error) {
    return console.error(`${module.id} - error: ${error.message}`);
}

