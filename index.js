const express = require('express')
const app = express();
const port = 3000;

const Discord = require('discord.js');
const client = new Discord.Client();

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('/index.html')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});



client.login('ODQ2NzQ2NDU2MDMxMjMyMDEw.YK0AFg.h6RRMr72zCjweywMS_rBqdIyQBs');