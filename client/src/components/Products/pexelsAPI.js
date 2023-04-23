import { createClient } from "pexels";
const client = '';

async function getPhotoUrl(query) {
  const resp = await(
    client.photos.search({
      query,
      per_page: 1,
      page: 1,
      orientation: "square",
      size: "small",
    })
  );
  const url = resp.photos[0].url;
  return url;
}

export { getPhotoUrl };