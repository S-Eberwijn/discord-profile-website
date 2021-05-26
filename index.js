const express = require('express')
const app = express();
const port = 3000;
var { urlencoded } = require('body-parser');
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = urlencoded({ extended: false })
app.use(express.static('public'));


const Discord = require('discord.js');
const client = new Discord.Client();


const userManager = new Discord.UserManager(client);


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('/index.html')
}).post('/', urlencodedParser, function (req, res) {
    let discordID = req.body.discordID;
    console.log(discordID);

    userManager.fetch(discordID).then(user => {
        console.log(user)
    })


    res.redirect(301, '/');
})

app.get('/redirect', (req, res) => {
    res.send('/index.html')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);

    // let userID = '278240897773076480';


});



client.login('');

