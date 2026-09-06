FROM node:20

ENV MONGODB_CONNECTION_PROTOCOL mongodb+srv
ENV MONGODB_DB_NAME gha-demo
ENV MONGODB_CLUSTER_ADDRESS cluster0.oj4wbe4.mongodb.net
ENV MONGODB_USERNAME prasannaidu178_db_user
ENV MONGODB_PASSWORD c7Kt7sgsZ6KEWoYC

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"]