FROM node
MAINTAINER Vinicius Egidio <vegidio@gmail.com>

RUN npm install -g forever

CMD forever /var/www/config.json
