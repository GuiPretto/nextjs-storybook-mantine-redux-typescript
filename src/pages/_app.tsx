import 'react-toastify/dist/ReactToastify.css';

import GlobalStyles from '@/styles/globals';
import Layout from '@/components/Layout';
import { MantineProvider } from '@mantine/core';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import Toast from '@/styles/toast';
import theme from '@/styles/theme';
import { useStore } from 'react-redux';
import wrapper from '@/redux/store';

const MyApp = ({ Component, pageProps }) => {
  const store: any = useStore();

  return (
    <PersistGate persistor={store.__persistor}>
      <MantineProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toast autoClose={10000} />
      </MantineProvider>
    </PersistGate>
  );
};

export const getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return { pageProps };
};

export default wrapper.withRedux(MyApp);
