#Image name (from docker hub)
FROM node:14-slim

#Where going to run commands from 
WORKDIR /usr/src/app

#Copy all dependencies
COPY ./package.json ./
COPY ./package-lock.json ./

#Install dependencies
RUN npm install 

#Copy everything. cwd => cwd
COPY . . 

#Run on port 5000
EXPOSE 5000

#Run start command
CMD [ "npm", "start" ]
