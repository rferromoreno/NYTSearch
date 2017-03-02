let request = require('request-promise');

exports.getNews = getNews;

function getNews(beginDate, endDate) {
    let options = optionTpm;
    options.qs.begin_date = `${beginDate}`;
    options.qs.end_date = `${endDate}`;
    return request(options);
}

//Options template for request
const optionTpm = {
    method: 'GET',
    uri: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
    qs: {
        'api-key': "63fdd7cc408c4759acc366e4350fb2b0",
        'q': "Argentina",
        'sort': "newest",
        'fl': "web_url,snippet,headline,pub_date"
    },
    json: true
}