const express = require('express'),
    router = express.Router(),
    { errorPage } = require('../controllers/error');

router.get('*', errorPage);

module.exports = router;