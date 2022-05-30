// authenticate a user, respond with signed jwt token and status 200 if
// authentication is successful, otherwise return 401

import jwt from "jsonwebtoken";
import clientPromise from "../../../utils/mongodb";
import sha256 from "../../../utils/sha256";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).end();
    return;
  }

  const { username, password } = JSON.parse(req.body);

  // check database for user, passing password through sha256 hash
  // since plain text passwords are never stored in the database for
  // security reasons.
  const client = await clientPromise;
  const user = await client
    .db()
    .collection("users")
    .findOne(
      { username, password: sha256(password) },
      { projection: { password: 0 } }
    );

  // convert the _id field to a string so that we can serialize it in jwt:
  user._id = user._id.toString();

  if (user) {
    // return json web token that expires in 15 minutes
    const fifteenMinutesInMs = 1000 * 60 * 15;
    const token = jwt.sign(
      { user: { ...user }, exp: Date.now() + fifteenMinutesInMs },
      process.env.JWT_SECRET,
      { noTimestamp: true } // FIXME: use built in timestamp instead of own
    );

    // store the auth-token on the client as a httponly cookie:
    res.setHeader(
      "set-cookie",
      `auth-token=${token}; path=/; httponly; samesite=lax;`
    );

    // send the user's id to client side so that the client can redirect to the correct profile page:
    res.status(200).send(user._id);
    return;
  } else {
    // return 404, the user does not exist
    res
      .status(404)
      .send("username or password did not match anything in the database");
    return;
  }
}
