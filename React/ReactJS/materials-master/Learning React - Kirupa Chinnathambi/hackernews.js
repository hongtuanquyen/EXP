let axios = require('axios');
let cheerio = require('cheerio');
let base_url = 'https://news.ycombinator.com/news?';
// let base_url = 'https://google.com?';
let noOfArticles = 0;

if(process.argv[2] && process.argv[2]<=100){
    noOfArticles = Number(process.argv[2]);
    console.log("Hold on !! ")
}
else{
  console.log("Number of articles should be <= 100")
  process.exit();
}

const pages = {
  1: [`${base_url}p=1`],
  2: [`${base_url}p=1`,`${base_url}p=2`],
  3: [`${base_url}p=1`,`${base_url}p=2`,`${base_url}p=3`],
  4: [`${base_url}p=1`,`${base_url}p=2`,`${base_url}p=3`,`${base_url}p=4`]
}

const pagination = Math.ceil(noOfArticles/30)

const axiosAll = (promises) =>{
    return promises.map((promise)=>{
        return axios.get(promise);
    }); 
}
 axios.all(axiosAll(pages[pagination]))
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
    console.log(hackerNews)
}).catch((e)=>{
    console.log(e.message,"Something Broke!!! Ouch!!!")
    throw e
})
