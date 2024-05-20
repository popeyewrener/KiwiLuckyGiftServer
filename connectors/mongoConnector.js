const MongoClient = require('mongodb').MongoClient;
 // MongoDB server URL
const dbName = 'giftServer'; 
const dotenv = require("dotenv").config();




async function connect(databaseUrl) {
  
  try {
    
const client = new MongoClient(databaseUrl, {
  readPreference: 'primary'
});
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

function getDatabase() {
  return client.db(dbName);
}

module.exports = {
  connect,
  getDatabase,
};
