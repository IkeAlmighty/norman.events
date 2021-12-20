import AWS from "aws-sdk";
import { getSession } from "next-auth/client";
export default async (req, res) => {
  const session = await getSession({ req });
  console.log(session.isAdmin);
  if (!session.isAdmin) {
    res.status(401).end();
    return;
  }

  const { key } = req.query;

  const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION,
  });

  await s3
    .deleteObject({ Bucket: process.env.S3_BUCKET_NAME, Key: key })
    .promise();

  res.status(200).end();
};
