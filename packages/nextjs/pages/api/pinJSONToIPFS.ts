import { NextApiRequest, NextApiResponse } from "next";

const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

import axios from "axios";
// import FormData from "form-data";
// import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const aurl = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  // //error handling
  // if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
  //   return {
  //     success: false,
  //     status: "❗Please make sure all fields are completed before minting.",
  //   };
  // }

  //metadata = JSON.parse(req.body)
  const metadata = {
    name: "Bored Ape 1185",
    image: "https://gateway.pinata.cloud/ipfs/Qma5JPiptf9BvR7JQnj97GtXpDLngL1BQ6wW337LvEHX5r",
    description: "description",
  };

  //making axios POST request to Pinata ⬇️
  return axios
    .post(aurl, metadata, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      res.send({
        success: true,
        pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send({
        success: false,
        message: error.message,
      });
    });
}

// https://docs.pinata.cloud/pinata-api/pinning/pin-file-or-directory
// const pinFileToIPFS = async () => {
//   const formData = new FormData();
//   const src = "path/to/file.png";

//   const file = fs.createReadStream(src);
//   formData.append("file", file);

//   const metadata = JSON.stringify({
//     name: "File name",
//   });
//   formData.append("pinataMetadata", metadata);

//   const options = JSON.stringify({
//     cidVersion: 0,
//   });
//   formData.append("pinataOptions", options);

//   try {
//     const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//       maxBodyLength: "Infinity" as any,
//       headers: {
//         "Content-Type": `multipart/form-data; boundary=${(formData as any)._boundary}`,
//         // Authorization: JWT,
//         pinata_api_key: key,
//         pinata_secret_api_key: secret,
//       },
//     });
//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
