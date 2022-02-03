import clientPromise from "../../../utils/mongodb";

export default async (req, res) => {
  const { _id } = JSON.parse(req.body);
  console.log(_id);
  const client = await clientPromise;

  let mongores = await client
    .db()
    .collection("event-requests")
    .deleteOne({ _id });

  if (mongores.deletedCount === 1) {
    res.status(204).end();
  } else {
    res.status(400).end();
  }
};
