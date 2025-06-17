require('dotenv').config();

module.exports = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  authUrl: process.env.AUTH_URL,
  baseUrl: process.env.BASE_URL
};
