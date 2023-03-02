/* eslint-disable @typescript-eslint/no-var-requires */
const { version } = require('./package.json');
const customCache = require('./public/customCache');
const isProd = process.env.NODE_ENV === 'production';
const scope = process.env.NEXT_PUBLIC_SCOPE;
// PWA configuration
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: !isProd,
  fallbacks: {
    document: `${scope}/_offline`,
  },
  runtimeCaching: customCache,
});

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  basePath: scope,
  compiler: {
    emotion: true,
  },
  publicRuntimeConfig: {
    version,
  },
  swcMinify: true,
  images: {
    path: `${scope}/_next/image`,
    domains: [
      // list of domains to let next fetch images
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        // using svgr to use svg's inline
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
                'removeDimensions',
              ],
            },
          },
        },
      ],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: scope,
        basePath: false,
        permanent: false,
      },
    ];
  },
};

module.exports = () => {
  const plugins = [withPWA];
  return plugins.reduce((acc, next) => next(acc), nextConfig);
};
