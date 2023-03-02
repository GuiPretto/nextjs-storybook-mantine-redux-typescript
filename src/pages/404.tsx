import Head from 'next/head';
import type { NextPage } from 'next';

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexGrow: '1',
          marginTop: '8rem',
        }}
      >
        <h1>404 - Page not found</h1>
      </div>
    </>
  );
};

export default Custom404;
