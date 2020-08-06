FROM node:alpine
LABEL maintainer="Vinicius Egidio <me@vinicius.io>"

# Define the image version
ARG VERSION
ENV IMAGE_VERSION=$VERSION

# Install Git
RUN apk --no-cache add git

# Install PM2
RUN yarn global add pm2
RUN pm2 install pm2-logrotate

# Logrotate configuration
RUN pm2 set pm2-logrotate:max_size 1M && \
    pm2 set pm2-logrotate:retain 30 && \
    pm2 set pm2-logrotate:compress true

# Setup the proxy
ENV APPS_DIR=/var/www
ENV APPS_PREFIX=app
ADD build /var/proxy

WORKDIR /var/www

# Start PM2
CMD pm2-runtime start /var/proxy/ecosystem.config.js