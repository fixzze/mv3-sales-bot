const axios = require("axios");

const getIPFSURL = (uri) => {
  const urlParts = uri.split("://");
  return urlParts;
};
const fetchMetadata = async (uri) => {
  let urlParts = getIPFSURL(uri);
  const prefix = urlParts[0];
  const ipfsURL = urlParts[1];
  console.log({ prefix, ipfsURL });
  let metadata = "";
  if (prefix === "ipfs") {
    metadata = await axios.get(`https://ipfs.io/ipfs/${ipfsURL}`);
  } else {
    metadata = await axios.get(uri);
  }
  console.log({ metadata });
  return {
    name: metadata.data.name,
    image:
      prefix === "ipfs"
        ? `https://ipfs.io/ipfs/${getIPFSURL(metadata.data.image)[1]}`
        : metadata.data.image,
  };
};

module.exports = { fetchMetadata };
