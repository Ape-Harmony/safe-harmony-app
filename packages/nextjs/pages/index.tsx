import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import List from "../components/SafeList";

import { safeMock } from "../mock";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Safe Harmony - Home</title>
        <meta name="description" content="safe NFT lending" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-8">
        <h1 className="text-4xl font-bold">Safe Harmony</h1>
        <p className="text-xl">safe NFT lending</p>
        <h3>Active Safes</h3>
        <List items={safeMock} />
      </div>
    </>
  );
};

export default Home;
