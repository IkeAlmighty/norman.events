import clientPromise from "../../../utils/mongodb";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  // protect this route so that only an admin can update events
  const session = await getSession({ req });
  if ((session.user && !session.user.isAdmin) || !session.user) {
    res.status(401).end();
    return;
  }

  const { eventData } = JSON.parse(req.body);

  const client = await clientPromise;

  let mongoRes = await client
    .db()
    .collection("event-requests")
    .updateOne({ _id: eventData._id }, { $set: { ...eventData } });

  if (mongoRes.matchedCount === 0) {
    res
      .status(404)
      .end(
        `Document matching id ${eventData._id} was not found, and so could not be updated.`
      );
  } else {
    res.status(204).end();
  }
};
