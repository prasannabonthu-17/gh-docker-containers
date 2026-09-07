FROM node:20

ENV MONGODB_DB_NAME gha-demo
ENV PORT 3000

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"]