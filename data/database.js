import { MongoClient } from 'mongodb';

// const connectionProtocol = process.env.MONGODB_CONNECTION_PROTOCOL;
// const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
// const dbUser = process.env.MONGODB_USERNAME;
// const dbPassword = process.env.MONGODB_PASSWORD;

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

// const uri = `${connectionProtocol}://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

const hasValidMongoUri = /^mongodb(\+srv)?:\/\/.+\.[a-z0-9.-]+\.[a-z]{2,}.*$/i.test(uri || '');

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable. Set it in your environment or GitHub secrets.');
}

if (!hasValidMongoUri) {
  throw new Error(
    'Invalid MONGODB_URI. Expected a MongoDB Atlas URI like: mongodb+srv://user:password@cluster0.oj4wbe4.mongodb.net/?retryWrites=true&w=majority'
  );
}

if (!dbName) {
  throw new Error('Missing MONGODB_DB_NAME environment variable.');
}

console.log('Trying to connect to db');

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('Connected successfully to server');
} catch (error) {
  console.log('Connection failed.');
  await client.close();
  console.log('Connection closed.');
  process.exit(1);
}

const database = client.db(dbName);

export default database;
