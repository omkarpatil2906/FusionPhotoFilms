
const { MongoClient } = require("mongodb");

// const uri = "mongodb+srv://dandaleganesh064:6FcPXcleEFEGHTd0@fusionphotofilms.p0fir.mongodb.net/fusionFilm";

const uri = "mongodb://127.0.0.1:27017/fusionFilm";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    return client.db("fusionFilm");
  } catch (error) {
    console.error("Could not connect to database", error);
    process.exit(1);
  }
}

module.exports = { connectToDatabase, client };
