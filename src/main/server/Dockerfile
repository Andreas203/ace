FROM node:latest
WORKDIR /
COPY package*.json ./
COPY tsconfig*.json ./

COPY ./src/main/server ./app

RUN npm install -g ts-node
RUN npm install

EXPOSE 3000
  
CMD ["ts-node", "/app/server.ts"]
