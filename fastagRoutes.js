const express = require('express');
const router = express.Router();
const fastagController = require('../controllers/fastagController');

router.post('/issue', fastagController.issueTag);
router.post('/wallet-balance', fastagController.getTagWalletBalance);


module.exports = router;
