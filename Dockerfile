FROM node
MAINTAINER Vinicius Egidio <me@vinicius.io>

RUN npm install -g pm2
RUN pm2 install pm2-logrotate

# Logrotate configuration
RUN pm2 set pm2-logrotate:max_size 1M
RUN pm2 set pm2-logrotate:retain 10
RUN pm2 set pm2-logrotate:compress true

# Start PM2
CMD pm2-runtime start /var/www/config.yml
