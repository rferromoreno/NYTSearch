const request = require('request-promise');
const urlCheckerService = require('../services/urlchecker.service.js');

module.exports = checkUrlMiddleware;

function checkUrlMiddleware(request, response) {
    //TODO for del array con un request 
    //a cada url (vas a tener que usar Promises.All para
    //resolver todas las promesas de los request a la vez)
    response.json(response.newsArray);
}