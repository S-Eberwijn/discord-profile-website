const express = require('express'),
    router = express.Router(),
    { userById, redirectToUserById, postUserById } = require('../controllers/users');

const { urlencoded } = require('body-parser');
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = urlencoded({ extended: false });

router.get('/users/:id', userById);
router.get('/users', redirectToUserById);
router.post('/users', urlencodedParser, postUserById);

module.exports = router;