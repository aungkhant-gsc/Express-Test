const express = require('express');
const { handleRefreshToken } = require('../../controllers/refreshTokenControler');
const router = express.Router();

router.get('/', handleRefreshToken)

module.exports = router