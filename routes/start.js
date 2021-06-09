const express = require('express'),
    router = express.Router(),
    { startPage } = require('../controllers/start');

router.get('/', startPage);

module.exports = router;