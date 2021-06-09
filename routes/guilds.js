const express = require('express'),
    router = express.Router(),
    { guildById, redirectToGuildById, postGuildById } = require('../controllers/guilds');

const { urlencoded } = require('body-parser');
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = urlencoded({ extended: false });

router.get('/guilds/:id', guildById);
router.get('/guilds', redirectToGuildById);
router.post('/guilds', urlencodedParser, postGuildById);

module.exports = router;