// importing node's http request package
const request = require("request");

// importing cheerio package to scrape iFunny
const  cheerio = require("cheerio")

// exporting main iFunny scraping function
module.exports = function(msg, url)
{
    // makes a site request to the given iFunny link
    request(url, (error, response, html) => {
        // checks to make sure that the site request has succeeded and no errors occured
        if(!error && response.statusCode == 200)
        {
            // loads cheerio object that contains the entire web page's html
            const $ = cheerio.load(html);

            // narrowing down focus to only the body of the html
            const body = $('body');

            // checks character postion 18 for what type of data the site holds, then passes the character to the right case
            switch(url.charAt(18))
            {
                case 'p':
                    // searches the body for the img tag and sends the tag's src attribute
                    let picTag = body.find('img').get(1);
                    msg.channel.send($(picTag).attr('src'));
                    break;
                    
                case 'm':
                    // searches the body for the img tag and sends the tag's src attribute
                    let memeTag = body.find('img').get(1);
                    msg.channel.send($(memeTag).attr('src'));
                    break;

                case 'v':
                    // searches the body for the first element that matches "data-src" attribute, then sends the link that follows the attribute
                    let vidSrc = body.html().split(" ").find(element => element.startsWith("data-src"));
                    vidSrc = vidSrc.substring(10, vidSrc.length - 1);
                    msg.channel.send(vidSrc);
                    break;

                case 'g':
                    // searches the body for the first element that matches "data-src" attribute, then sends the link that follows the attribute
                    let gifSrc = body.html().split(" ").find(element => element.startsWith("data-src"));
                    gifSrc = gifSrc.substring(10, gifSrc.length - 1);
                    msg.channel.send(gifSrc);
                    break;

                // default case just in case something fucks up
                default:
                    msg.channel.send("I'm sorry, something went wrong because I'm retarded.");
            }
        }
        // returns a message if the link returns an error 404
        else if(response.statusCode == 404)
            msg.channel.send("I'm sorry, either the meme has been removed, or there is an error in the link.");

        // sends a message if anything else goes wrong
        else
            msg.channel.send("I'm sorry, something went wrong because I'm retarded.")
    });
}