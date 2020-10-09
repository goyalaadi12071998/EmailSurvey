FROM node:alpine

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY ./ ./

EXPOSE 5000

RUN npm install -g nodemon

CMD ["npm","run","dev"]