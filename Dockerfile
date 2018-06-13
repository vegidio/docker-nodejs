FROM node
MAINTAINER Vinicius Egidio <me@vinicius.io>

RUN npm install -g pm2

CMD pm2 start /var/www/config.yml && pm2 logs
