import { useEffect, useState } from "react";
import { fetchImageURL } from "../utils/s3";
export default function S3Image({ imageKey, alt, className }) {
  const [url, setURL] = useState(undefined);

  useEffect(async () => {
    if (!imageKey) return;
    const { url } = await fetchImageURL(imageKey);
    setURL(url);
  }, [imageKey]);

  return (
    <img
      src={url ? url : "404.png"}
      alt={alt ? alt : "image did not load"}
      className={className}
      style={{ width: "100%" }}
    />
  );
}
