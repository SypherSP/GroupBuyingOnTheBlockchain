import { createClient } from "pexels";
const client = createClient('EvnJzaVZWlPPdZCQnDiTgwsYL7GB9LY0yxxoXARBfOwlHfIc6sKRkS5u');

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
  const url = resp.photos[0].src.original;
  return url;
}

export { getPhotoUrl };