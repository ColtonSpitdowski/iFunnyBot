FROM node:16

#Create bot directory
WORKDIR /iFunnyBot

#Install app dependencies
COPY package*.json ./

#Running npm install command
RUN npm install

#Copying source code
COPY . .

#Starting node project
CMD ["node", "bot.js"]