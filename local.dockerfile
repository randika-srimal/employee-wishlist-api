FROM node:16.13-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /home/node
 
COPY ./src/package*.json ./

RUN npm install

COPY --chown=node:node ./src .

USER node

EXPOSE 4000

CMD ["node","app.js"]