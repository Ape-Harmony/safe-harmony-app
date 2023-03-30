import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Safe Harmony - Home</title>
        <meta name="description" content="safe NFT lending" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-8">
        <h1 className="text-4xl font-bold">Safe Harmony</h1>
      </div>
    </>
  );
};

export default Home;
