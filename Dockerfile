FROM node:8

VOLUME /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app/

RUN npm install /usr/src/app/ && npm install pm2 -g

EXPOSE 3000

CMD [ "pm2", "start", "--name=urlshortener", "npm", "--", "start" ]
