module.exports = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  compiler: {
    styledComponents: true,
  },

  async rewrites() {
    return [
      {
        source: '/matrix/:path*',
        destination: 'https://matrix.little-portland.com/:path*',
      },
    ]
  },
}
