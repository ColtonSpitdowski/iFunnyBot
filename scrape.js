// importing node's http request package
const request = require("request");

// importing embed stuff from Discord
const {MessageEmbed} = require('discord.js')

// importing cheerio package to scrape iFunny
const  cheerio = require("cheerio")

// exporting main iFunny scraping function
module.exports = function(msg, url)
{
    try
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
                        embedMeme(msg, html);
                        break;
                        
                    case 'm':
                        embedMeme(msg, html);
                        break;

                    case 'v':
                        // searches the body for the first element that matches "data-src" attribute, then sends the link that follows the attribute
                        let vidSrc = body.html().split(" ").find(element => element.startsWith("data-src"));
                        vidSrc = vidSrc.substring(10, vidSrc.length - 1);

                        // searches the body for the author's name
                        let namelist = body.html().match(/(user\/)(\w+)/gm);
                        let author = namelist[0].substring(namelist[0].lastIndexOf("/") + 1);

                        msg.channel.send(`OP: ${author} - ${vidSrc}`);
                        break;

                    case 'g':
                        // searches the body for the first element that matches "data-src" attribute, then sends the link that follows the attribute
                        let gifSrc = body.html().split(" ").find(element => element.startsWith("data-src"));
                        gifSrc = gifSrc.substring(10, gifSrc.length - 1);
                        msg.channel.send(gifSrc);
                        break;

                    // default case just in case something messes up
                    default:
                        msg.channel.send("I'm sorry, something went wrong.");
                }
            }
            // returns a message if the link returns an error 404
            else if(response.statusCode == 404)
                msg.channel.send("I'm sorry, either the meme has been removed, or there is an error in the link.");

            // sends a message if anything else goes wrong
            else
                msg.channel.send("I'm sorry, something went wrong.");
        });
    }
    catch(error)
    {
        msg.channel.send("I'm sorry, something went wrong.")
    }
}

function embedMeme(msg, html)
{
    // loads cheerio object that contains the entire web page's html
    const $ = cheerio.load(html);

    // narrowing down focus to only the body of the html
    const body = $('body');

    // searches the body for the img tag and sends the tag's src attribute
    let picTag = body.find('img').get(1);

    // searching for meme author's name using regex
    let namelist = body.html().match(/(user\/)(\w+)/gm);
    let author = namelist[0].substring(namelist[0].lastIndexOf("/") + 1);
    
    // searching for the url to the author's profile picture using regex
    let authorPicRegex = body.html().match(/((alt=")(\w+)).\s(data-src=")([^"]+)/gm);
    let authorPic = authorPicRegex[0].match(/(data-src=")([^"]+)/gm)[0];
    authorPic = authorPic.substring(authorPic.indexOf('\"') + 1);

    // making a new message embed and adding image, author, author's pic, and a timestamp to it
    let embed = new MessageEmbed()
    embed.setImage($(picTag).attr('src'));
    embed.setAuthor({name: author, iconURL: authorPic, url: `https://ifunny.co/user/${author}`});
    embed.setTimestamp();
    
    // sending the embed
    msg.channel.send({embeds: [embed]});
}