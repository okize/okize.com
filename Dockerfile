# base image
FROM node:20.12.1-alpine

# set container working directory
WORKDIR /app

# copy package.json and package-lock.json to the container
COPY package*.json ./

# install deps
# this step is separated from copying the rest of the code to leverage Docker cache
RUN npm install

# copy remainder of application code to the container
COPY . .

# port that the app runs on
EXPOSE 3333

# command to start app
CMD ["npm", "run", "start"]
