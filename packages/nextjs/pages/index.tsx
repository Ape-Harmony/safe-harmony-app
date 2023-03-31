import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { HStack, Box, VStack, Spacer } from "@chakra-ui/react";

import List from "../components/SafeList";
import SafeOnRamp from "../components/SafeOnRamp";

import { safeMock } from "../mock";
import { SafeOnRampKit, SafeOnRampProviderType } from '@safe-global/onramp-kit'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        {/* <title>Safe Harmony - Home</title> */}
        <meta name="description" content="safe NFT lending" />
      </Head>

      <HStack spacing={8}>
        <Box id="stripe-root" mt={4}>
          <img src="/assets/landing.svg" alt="landing" />
          <Box mt={6} ml={20}><SafeOnRamp/></Box>
        </Box>
        <div className="pt-8">
          <Spacer />
          <Box>
            <img src="/assets/info.svg"></img>
          </Box>
          <Box pt={8} pb={2}>
            <h1 style={{ fontWeight: "bold" }}>ACTIVE SAFES</h1>
          </Box>
          <VStack gap={2} style={{ height: "660px", overflow: "scroll" }}>
            <List items={safeMock} />
          </VStack>
        </div>
      </HStack>
    </>
  );
};

export default Home;
