FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm test

CMD ["npm", "run", "build"]