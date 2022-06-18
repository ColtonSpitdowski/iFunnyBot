// setting up environment variable
require('dotenv').config();

// getting the webscraping code as an object
const scrape = require('./scrape.js');

// getting Client and Intents classes from discord.js
const { Client, Intents } = require('discord.js');

// making a new Discord client
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

//logging into the client using the bot's token
client.login(process.env.BOT_TOKEN)

// printing into the console when the bot is ready
client.on('ready', () =>
{
    console.log("iFunnyBot is ready!")
    client.user.setActivity(`for memes in ${client.guilds.cache.size} servers`, {type: "WATCHING"});
})

// message event handler
client.on('messageCreate', msg =>
{
    // making sure the bot doesn't respond to itself
    if(!(msg.author == client.user))
    {
        // splitting the message up by spaces
        const content = msg.content.split(" ");

        // searching content[] for any element that contains an iFunny link
        if(content.some(element => element.startsWith("https://ifunny.co/")))
        {
            let url = content.find(element => element.startsWith("https://ifunny.co"));
            scrape(msg, url);
        }
    }
})