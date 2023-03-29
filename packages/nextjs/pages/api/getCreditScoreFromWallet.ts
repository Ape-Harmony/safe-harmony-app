import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { useAccount } from "wagmi";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = process.env.SPECTRAL_API_KEY;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const { address } = useAccount();
  const data = {
    // your request data here
  };

  axios
    .post("https://api.spectral.finance/api/v1/addresses/" + { address } + "/calculate_score", data, { headers })
    .then(response => {
      console.log(response);
      // handle the server response here
    })
    .catch(error => {
      // handle errors here
    });
}
