const request = require('request-promise');
const urlCheckerService = require('../services/urlchecker.service.js');

module.exports = checkUrlMiddleware;

function checkUrlMiddleware(request, response) {
    //TODO for del array con un request 
    //a cada url (vas a tener que usar Promises.All para
    //resolver todas las promesas de los request a la vez)

    /*   THEMPLATE DE REQUEST.PARAMS.NEWSaRRAY
    
    
    [
  {
    "web_url": "http://www.nytimes.com/2016/12/31/world/asia/indonesia-donald-trump-resort.html",
    "snippet": "President-elect Donald J. Trump has made deals involving two resorts in Indonesia and forged relationships with powerful political figures there....",
    "headline": {
      "main": "Trump’s Indonesia Projects, Still Moving Ahead, Create Potential Conflicts",
      "print_headline": "Despite Conflict Risk, Trump Projects Push On"
    },
    "pub_date": "2016-12-31T16:09:59+0000"
  },
  
  
   */
 
var data=request.res.newsArray;
 var promiseArray= new Array();
    data.forEach((noticia)=>{
        var url=noticia.web_url;
        var aux=urlCheckerService.checkUrl(url);
       promiseArray.push(aux);
      }
      
       );
 
Promise.all(promiseArray).then((response)=>{
  //noticia.isAvailable=response;   
        console.log("then ejecutado");})
        
        .catch(handleError)
   
 



 response.json(response.newsArray);
}




function handleError(error){
console.log(error);

}