const request = require('request');   //request module for sending request to a site
const cheerio = require("cheerio");   //popular module for web scrapping
const chalk = require("chalk");      //to print colored statements in terminal
// feature -> request
console.log("Before");
request('https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard', cb);

console.log("After")
function cb(error, response, html) {
    if (error) {
        console.error('error:', error); // Print the error if one occurred
    } else {
        handlehtml(html);
        // Print the HTML for the Google homepage.
    }
}

function handlehtml(html){
    let selTool = cheerio.load(html);
     // let h1s = selTool("h1");
     let playerofthematch = selTool(".best-player-title")
     let pname=selTool(".best-player-name")
     console.log(chalk.red(selTool(playerofthematch).text()));
     console.log(chalk.blue(selTool(pname).text()));
}