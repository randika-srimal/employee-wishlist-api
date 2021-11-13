FROM node:16-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /home/node
 
COPY ./src/package*.json ./

# RUN npm install

COPY --chown=node:node ./src .

USER node

EXPOSE 4000

# Keep running container until app.js create
ENTRYPOINT ["tail"]
CMD ["-f","/dev/null"]

# CMD ["node","app.js"]