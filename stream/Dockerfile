FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && mkdir media thumbnails

COPY . .

EXPOSE 1935
EXPOSE 8888

CMD ["node", "."]