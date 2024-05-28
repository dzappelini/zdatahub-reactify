import React from "react";
import Head from "next/head";
import Status from "components/Status";

function HomePage() {
  return (
    <div>
      <Head>
        <title>Bem-vindo à Página Inicial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <h1>Bem-vindo à Página Inicial</h1>
      <Status />
    </div>
  );
}

export default HomePage;
