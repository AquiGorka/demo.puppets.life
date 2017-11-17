module.exports = {
  type: 'react-app',
  webpack: {
    define: {
      GOOGLE_APIKEY: JSON.stringify(process.env.GOOGLE_APIKEY),
      PUPPETEER_URL: JSON.stringify(process.env.PUPPETEER_URL)
    },
    extra: {
      node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
      }
    }
  }
}
