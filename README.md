# A simple Discord bot that takes iFunny links and posts the image/video/gif in chat. #

iFunnyBot is a simple little project that I made since iFunny links don't embed into Discord chats. The bot takes the iFunny link and parses the source html until it finds the url that points directly to the meme. It then posts the url and Discord embeds the meme using the url.

### Usage ###
Using the iFunnyBot is as simple as posting the link to the meme in the Discord chat. Once you do that, the bot does the rest for you.

### Invite ###
You can invite the bot to your server [here](https://dingus.info/)

### Installation Instructions ###
This section is strictly if you feel like hosting your own private iFunnyBot. If you do feel like doing so, the steps are relatively easy.
1. First, we are going to need to get a token that actually allows the bot to interact with the Discord API. The steps are very simple and can be done by following [this guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot). Once you have your bot's token, simply paste that into a text editor for now.
2. Next, we are going to clone this repository using the command `git clone https://github.com/ColtonSpitdowski/iFunnyBot`
    - If you don't have git installed, follow this [guide here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
3. Once the repo is cloned, enter the folder and make a file named .env
4. Inside this file, write BOT_TOKEN= exactly, and then copy and paste your bot token from earlier. Be sure there is no space between the = and the start of your bot token. Be sure to save the file.
5. Now that we have token situated, we are going to use Docker to containerize the bot. Make sure that you are in the root directory of the repo, then build a docker image using the command `docker build . -t <whatever you want to name the image>`.
    - If you don't have docker installed, you can follow this [guide here](https://docs.docker.com/engine/install/).
6. Once the image is built, you can run the image using the command `docker run -d --restart:on-failure --name <whatever you want to name the container> <whatever you named the image earlier>`

Now you have your own personal iFunnyBot! You can stop and start the bot with the the commands `docker stop <container name>` and `docker start <container name>`.

### Like the bot? ###
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E1DCYY2)
