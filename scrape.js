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

                let memeType = url.charAt(18);

                if(memeType == 'p' || memeType == 'm')
                    embedMeme(msg, $);
                else if(memeType == 'v' || memeType == 'g')
                    msg.channel.send(`OP: ${getAuthorName(body)} - ${getSource(body)}`);
                else
                    msg.channel.send("I'm sorry, something went wrong.");
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

function embedMeme(msg, $)
{
    // narrowing down focus to only the body of the html
    const body = $('body');
    
    // searches the body for the img tag and sends the tag's src attribute
    let picTag = body.find('img').get(1);

    // getting author's name
    let author = getAuthorName(body);
    
    //getting the author's profile picture
    authorPic = getAuthorPic(body);
    
    // making a new message embed and adding image, author, author's pic, and a timestamp to it
    let embed = new MessageEmbed()
    embed.setImage($(picTag).attr('src'));
    embed.setAuthor({name: author, iconURL: authorPic, url: `https://ifunny.co/user/${author}`});
    embed.setTimestamp();
    
    // sending the embed
    msg.channel.send({embeds: [embed]});
}

function getSource(body)
{
    // searches through the body for source of the video/gif
    let dataSrc = body.html().split(" ").find(element => element.startsWith("data-src"));
    return dataSrc.substring(10, dataSrc.length - 1);
}

function getAuthorName(body)
{
    // searching for list of usernames using regex
    let namelist = body.html().match(/(user\/)(\w+)/gm);

    // getting author's name from the list of usernames
    let author = namelist[0].substring(namelist[0].lastIndexOf("/") + 1);

    return author;
}

function getAuthorPic(body)
{
    // searching for the url to the author's profile picture using regex
    let authorPicRegex = body.html().match(/((alt=")(\w+)).\s(data-src=")([^"]+)/gm);
    let authorPic = authorPicRegex[0].match(/(data-src=")([^"]+)/gm)[0];
    return authorPic.substring(authorPic.indexOf('\"') + 1);
}