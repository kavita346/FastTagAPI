const fastagService = require('../services/fastagService');
const { generateRequestUUID } = require('../utils/uuidGenerator');

exports.getTagWalletBalance = async (req, res) => {
  try {
    const requestBody = req.body;
    const testIdHeader = req.headers['x-axis-test-id'];

    if (!testIdHeader) {
      return res.status(400).json({ error: "Missing header: X-AXIS-TEST-ID" });
    }

    // Auto generate requestUUID if not provided
    if (!requestBody.SubHeader) {
      requestBody.SubHeader = {};
    }

    if (!requestBody.SubHeader.requestUUID) {
      requestBody.SubHeader.requestUUID = generateRequestUUID();
    }

    const result = await fastagService.getTagWalletBalance(requestBody, testIdHeader);
    res.json(result);
  } catch (error) {
    console.error('FASTag API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'FASTag API call failed' });
  }
};

exports.issueTag = async (req, res) => {
  try {
    const result = await fastagService.issueFastag(req.body);
    res.json(result);
  } catch (error) {
    console.error('FASTag Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'FASTag API call failed' });
  }
};
