const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['github.blog', 'images.unsplash.com', 'res.cloudinary.com'],
    deviceSizes: [320, 640, 1080, 1200],
    imageSizes: [64, 128],
  },
  swcMinify: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    esmExternals: false,
  },
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/blog', destination: '/news', permanent: true },
      { source: '/blog/:slug*', destination: '/news/:slug*', permanent: true },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Fix ESM directory import: tinacms imports @heroicons/react/solid (directory),
    // which Node's ESM resolver rejects. Point it to the explicit index.js.
    config.resolve.alias['@heroicons/react/solid'] = require.resolve('@heroicons/react/solid/index.js');
    config.resolve.alias['@heroicons/react/outline'] = require.resolve('@heroicons/react/outline/index.js');

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      use: [{ loader: '@svgr/webpack' }, { loader: 'url-loader' }],
    });

    return config;
  },
});
