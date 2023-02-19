import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export const getRoom = async (id) => {
  const client = await clientPromise;

  const db = client.db("home-automation");

  try {
    let room;

    if (id == null) {
      room = await db.collection("rooms").find({}).toArray();
    } else {
      room = await db.collection("rooms").find({ id: id }).toArray();
    }
    return room;
  } catch (e) {
    throw e;
  }
};

export const getItems = async (id) => {
  const client = await clientPromise;

  const db = client.db("home-automation");

  try {
    const items = await db
      .collection("items")
      .find({ roomID: id })
      .sort({ id: 1 })
      .toArray();

    return items;
  } catch (e) {
    throw e;
  }
};

export async function createItem(
  input_id,
  input_currentState,
  input_roomID,
  input_itemName
) {
  const client = await clientPromise;
  const db = client.db("home-automation");

  const item = {
    id: input_id,
    currentstate: input_currentState,
    roomId: input_roomID,
    itemName: input_itemName,
  };

  await db.collection("items").insertOne(item);
}
