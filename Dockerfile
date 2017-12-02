FROM node
MAINTAINER Vinicius Egidio <me@vinicius.io>

RUN npm install -g forever

CMD forever /var/www/config.json
