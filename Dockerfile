FROM node:latest

MAINTAINER Mark Rendell, <markosrendell@gmail.com>

COPY * /data

WORKDIR /data

RUN bower install && \
    npm install

CMD npm start
