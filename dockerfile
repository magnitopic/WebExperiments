FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-css

ENV PORT=5000

EXPOSE 5000

CMD [ "node", "index" ]