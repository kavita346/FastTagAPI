const axios = require('axios');
const { authUrl, clientId, clientSecret } = require('../config/apiConfig');

let cachedToken = null;
let tokenExpiry = 0;  // safer default

exports.getAccessToken = async () => {
  const now = Date.now();

  // Use cached token if not expired
  if (cachedToken && tokenExpiry > now) {
    return cachedToken;
  }

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    const response = await axios.post(
      authUrl,  // no need for template string here
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 5000  // optional: set timeout for better stability
      }
    );

    cachedToken = response.data.access_token;

    // Prevent early expiry: buffer time of 60 seconds (safe margin)
    tokenExpiry = now + ((response.data.expires_in - 60) * 1000);

    return cachedToken;
  } catch (error) {
    console.error('Error fetching access token:', error.response?.data || error.message);
    throw new Error('Failed to obtain access token');
  }
};
