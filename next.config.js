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
        source: '/matrix/api/:path*',
        destination: 'https://api-matrix.little-portland.com/api/:path*',
      },
      {
        source: '/matrix/:path*',
        destination: 'https://matrix.little-portland.com/:path*',
      },
    ]
  },
}

