import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let clientPromise = global.clientPromise;

if (!clientPromise) {
  let client = new MongoClient(MONGO_URI, options);
  global.clientPromise = client.connect();
  clientPromise = global.clientPromise;
}

export default clientPromise;
