FROM node:alpine
WORKDIR /usr/src/index
COPY package*.json .
RUN npm ci
COPY . .
CMD [ "npm", "start" ]