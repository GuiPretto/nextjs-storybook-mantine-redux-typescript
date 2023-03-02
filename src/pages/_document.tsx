import Document, { Head, Html, Main, NextScript } from 'next/document';

import { createGetInitialProps } from '@mantine/next';

const getInitialProps = createGetInitialProps();

class MyDocument extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="shortcut icon"
            href={`${process.env.NEXT_PUBLIC_SCOPE}/favicon.ico`}
          />
          <link
            rel="manifest"
            href={`${process.env.NEXT_PUBLIC_SCOPE}/manifest.json`}
          />
          <meta name="theme-color" content="#000000" />
          <link
            rel="apple-touch-icon"
            href={`${process.env.NEXT_PUBLIC_SCOPE}/icons/icon-192x192.png`}
          />
          <meta name="description" content="Boilerplate for projects." />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
