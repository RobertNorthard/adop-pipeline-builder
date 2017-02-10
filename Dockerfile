FROM node:latest

MAINTAINER Mark Rendell, <markosrendell@gmail.com>

COPY * /data/

WORKDIR /data

RUN npm install
RUN npm install -g bower
RUN bower install --allow-root --config.interactive=false
RUN apt-get purge -y --auto-remove gcc git make 

EXPOSE 3000

ENTRYPOINT ["npm"]

CMD ["start"]
