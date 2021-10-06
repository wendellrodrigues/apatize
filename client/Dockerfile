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

#Run on port 3000
EXPOSE 3000

ENV REACT_APP_BASE_URL=http://localhost:5000/api

#Run start command
CMD [ "npm", "start" ]
