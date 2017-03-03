let request = require('request-promise');
var errors = require('request-promise/errors');

exports.getNews = getNews;

/*
*Gets the news.
*   Returns a promise of an array of news.
*/
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
    console.log(`${module.id} - method stripData - response status: ${response.status}`);
    return response.response.docs;
}

function handleError(error) {
    return console.error(`${module.id} - error: ${error}`);
}

//Options template for request
const optionTmp = {
    method: 'GET',
    uri: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
    qs: {
        'api-key': "63fdd7cc408c4759acc366e4350fb2b0",
        'q': "Argentina",
        'sort': "newest",
        'fl': "web_url,snippet,headline,pub_date"
    },
    json: true
};