import Head from 'next/head';
import type { NextPage } from 'next';

const Offline: NextPage = () => {
  return (
    <>
      <Head>
        <title>Offline</title>
      </Head>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexGrow: '1',
          marginTop: '8rem',
        }}
      >
        <h1>Offline - You are offline!</h1>
      </div>
    </>
  );
};

export default Offline;
