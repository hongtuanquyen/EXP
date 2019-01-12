let axios = require('axios');
let cheerio = require('cheerio');
const api_url = 'https://news.ycombinator.com/news?';
let noOfArticles = 0;

if(process.argv[2] && process.argv[2]<=100){
    noOfArticles = Number(process.argv[2]);
    console.log("Hold on !! ")
}
else{
  console.log("Number of articles should be <= 100")
  process.exit();
}

const pagination = Math.ceil(noOfArticles/30)

const logJSON = async () => {
    let axiosAll = [];
    for(let i =0; i < pagination;i++ ){
        axiosAll.push(await axios.get(`${api_url}p=${i}`))
    }
    
 Promise.all(axiosAll)
 .then(axios.spread((...args) => {
   let itemListText = '';
       for (let page in args){
         let $ = cheerio.load(args[page].data)
         itemListText += $('.itemlist').html();   
       }
       return itemListText
})).then((itemListText)=>{
   let tempHTML = '<div id="itemlist" class="items"></div>';
   let $ = cheerio.load(tempHTML)
   $(itemListText).appendTo('#itemlist')
   return $
}).then(($) => {
 let title = [],
     articleDesc = [],
     hackerNews = [];
 $('.items tr.athing').each(function(i, elem) {
     let obj = {
         "title": $(elem).find('.storylink').text(),
         "uri": decodeURIComponent($(elem).find('.storylink').attr('href'))
     }
     title.push(obj)
 });
 $('.items tr .subtext').each(function(i, elem) {
     let obj = {
         "point": $(elem).find('.score').text(),
         "author": $(elem).find('.hnuser').text()
     }
     articleDesc.push(obj)
 });
 articleDesc.forEach((article, i) => {
     if (article.point && article.author) {
         hackerNews.push(Object.assign(article, title[i]))
     }
 });

 hackerNews = JSON.stringify(hackerNews,null,2);
 console.log(hackerNews)
}).catch((e)=>{
 console.log(e.message,"Something Broke!!! Ouch!!!")
 throw e
})

}

logJSON()
