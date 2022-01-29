import clientPromise from "../../../utils/mongodb";

export default async (req, res) => {
  const { eventData } = JSON.parse(req.body);

  const keys = Object.keys(eventData);
  for (let index = 0; index <= keys.length; index++) {
    if (eventData[keys[index]] === "" && keys[index] !== "details") {
      res.status(400).end("All data except 'details' field must be filled out");
      return;
    }
  }

  const client = await clientPromise;

  let mongoRes = await client
    .db()
    .collection("event-requests")
    .insertOne({ ...eventData });

  res.json(mongoRes);
};
