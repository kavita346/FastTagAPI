const axios = require('axios');
const { baseUrl } = require('../config/apiConfig');
const { getAccessToken } = require('./authService');

// Issue Fastag Service
exports.issueFastag = async (data) => {
  try {
    const token = await getAccessToken();

    const response = await axios.post(
      `${baseUrl}/fastag/issueTag`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000  // optional: safe timeout
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error in issueFastag:', error.response?.data || error.message);
    throw new Error('Failed to issue FASTag');
  }
};

// Get Tag Wallet Balance Service
exports.getTagWalletBalance = async (data, testIdHeader) => {
  try {
    const token = await getAccessToken();

    const response = await axios.post(
      `${baseUrl}/wallet-balance`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-AXIS-TEST-ID': testIdHeader,
          'Content-Type': 'application/json'
        },
        timeout: 5000
      }
    );

    return response.data;
  } catch (error) {
    // Improved full Axios error log
    if (error.response) {
      console.error("Response error data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("General error message:", error.message);
    }
    throw new Error('Failed to fetch Tag Wallet Balance');
  }
};
