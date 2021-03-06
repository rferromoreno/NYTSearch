import request from 'request-promise';
import errors from 'request-promise/errors';
import config from "../config.json";
import logger from "../logger";

/*
*Gets the news.
*   Returns a promise of an array of news.
*/

//Options template for request
const optionTmp = {
    method: 'GET',
    uri: config.apiurl,
    qs: {
        'api-key': config.apikey,
        'sort': "newest",
        'fl': "web_url,snippet,headline,pub_date"
    },
    json: true
};

export default
  function getNews(beginDate, endDate, query) {
    let options = setOptions(beginDate, endDate, query);
    return request(options)
            .then(stripData)
            .catch(handleError);
}

//Creates the options object.
function setOptions(beginDate, endDate, query) {
    let options = optionTmp;

    //Overriding options themplate.
    options.qs.q = `${query}`;
    options.qs.begin_date = `${beginDate}`;
    options.qs.end_date = `${endDate}`;
    return options;
}

//Resolving promise to strip innecesary meta-data
function stripData(response) {
    //console.log(`${module.id} - method stripData - response status: ${response.status}`);
    logger.info(`${module.id} - method stripData - response status: ${response.status}`);
    return response.response.docs;
}

function handleError(error) {
    logger.error(`${module.id} - error: ${error}`);
    return error; 
}
