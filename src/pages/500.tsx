import Head from 'next/head';
import type { NextPage } from 'next';

const Custom500: NextPage = () => {
  return (
    <>
      <Head>
        <title>500</title>
      </Head>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexGrow: '1',
          marginTop: '8rem',
        }}
      >
        <h1>500 - Server-side error occurred</h1>
      </div>
    </>
  );
};

export default Custom500;
