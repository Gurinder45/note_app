FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV TZ=America/Vancouver

CMD ["node", "index.js"]