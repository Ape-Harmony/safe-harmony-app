import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ape Harmony - Home</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-8">
        <img src="\assets\ApeHarmony-Logo.png" alt="Ape harmony" />
      </div>
    </>
  );
};

export default Home;
