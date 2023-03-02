import Head from 'next/head';
import type { NextPage } from 'next';
import { RootState } from '@/redux/rootReducer';
import { useSelector } from 'react-redux';

const Home: NextPage = () => {
  // use RootState interface to get all the store structure ready for you!
  const { name, address, phone } = useSelector(
    (store: RootState) => store.Example
  );

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        <p>Name: {name}</p>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Home;
