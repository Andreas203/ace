FROM node:latest
WORKDIR /
COPY package*.json ./
COPY tsconfig*.json ./

COPY ./src/server ./app

RUN npm install -g ts-node

# Install dependencies
RUN yarn install

EXPOSE 3000
  
CMD ["ts-node-esm", "/app/server.ts"]