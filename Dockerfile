FROM node:20.10.0

WORKDIR /usr/src/docker-node-redis

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]