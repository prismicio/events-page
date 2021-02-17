module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/product-meetup',
        permanent: true,
      },
    ];
  },
};
