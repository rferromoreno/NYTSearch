let request = require('request-promise');

exports.getNews = getNews;

//Gets the news.
//Returns a promise.
function getNews(beginDate, endDate, query) {
    let options = setOptions(beginDate, endDate, query);
    return request(options).then(stripData);
}

//Resolving promise to strip innecesary meta-data
function stripData(response) {
    return response.response.docs;
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

//Query options enum for API call
const qsOptionsEnum = [
    'q',
    'sort',
    'fl'
];