# A simple Discord bot that takes iFunny links and posts the image/video/gif in chat. #

iFunnyBot is a simple little project that I made since iFunny links don't embed into Discord chats. The bot takes the iFunny link and parses the source html until it finds the url that points directly to the meme. It then posts the url and Discord embeds the meme using the url.

### Usage ###
Using the iFunnyBot is as simple as posting the link to the meme in the Discord chat. Once you do that, the bot does the rest for you.

![iFunnyBot example smallest](https://user-images.githubusercontent.com/81008604/174526988-9c6a9308-0500-45db-9469-b35becc72f18.gif)

### Invite ###
You can invite the bot to your server [here](https://dingus.info/).

### Installation Instructions ###
This section is strictly if you feel like hosting your own private iFunnyBot. If you do feel like doing so, the steps are relatively easy.
1. First, we are going to need to get a token that actually allows the bot to interact with the Discord API. The steps are very simple and can be done by following [this guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot). Once you have your bot's token, simply paste that into a text editor for now. Note: DO NOT SHARE THIS TOKEN WITH ANYONE
2. Next, we are going to make a folder called "iFunnyBot" somewhere we can easily access, like your home directory.
3. Once the folder has been created, enter it and make a file named .env
4. Inside this file, write BOT_TOKEN= exactly, and then copy and paste your bot token from earlier. Be sure there is no space between the = and the start of your bot token. Be sure to save the file.
5. For convenience's sake, I have published a docker image that you can download by using the command `docker pull ghcr.io/coltonspitdowski/ifunnybot:latest`
    - If you don't have docker installed, you can follow this [guide here](https://docs.docker.com/engine/install/).
6. Once the image is downloaded, we are going to actually run the image. Since the image that you downloaded doesn't include a .env file in it (for obvious reasons), we are going to have to pass it into the container whenever we start it. This can be accomplished by using this command: `docker run -d -v <absolute path to your .env file>:/iFunnyBot/.env --restart on-failure --name <custom container name> ghcr.io/coltonspitdowski/ifunnybot`

Now you have your own personal iFunnyBot! You can stop and start the bot with the the commands `docker stop <container name>` and `docker start <container name>`.

### Like the bot? ###
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E1DCYY2)
