require('dotenv').config()
const express = require('express')
const path = require('path');
const favicon = require('serve-favicon');

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = '';

// Init App
const app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


const { Client } = require('discord.js');
const client = new Client();


//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, './public')));

// Home Route
app.use('/', require('./routes/start'))

// Users Routes
app.use('/', require('./routes/users'))

// Guilds Routes
app.use('/', require('./routes/guilds'))

// Error Route
app.use('/', require('./routes/error'))


// Login Discord Bot 
client.login(process.env.BOT_TOKEN).then(() => {
    // Start Server
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
        module.exports = client;
    })
});

// Run when Discord Bot logs in
client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});


//TODO: created at visualisation on card.