require('dotenv').config()
const express = require('express')
const path = require('path');

// Init App
const app = express();
const { urlencoded } = require('body-parser');
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = urlencoded({ extended: false })


const { Client, UserManager } = require('discord.js');
const client = new Client();

let timesCalled = 0;
const badgesMap = initializeBadgeMap();

const userManager = new UserManager(client);

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.use(express.static(path.join(__dirname, './public')));

// Home Route
app.get('/', (req, res) => {
        userManager.fetch(client.user.id).then(discordUser => {
            console.log(discordUser.flags)
            calculateBadges(discordUser.flags, badgesMap)

            res.render('index', { title: `After Call #${timesCalled}`, username: `${discordUser.username}`, discriminator: `${discordUser.discriminator}`, avatar: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`, isBot: discordUser.bot });

        }).catch(err => {
            res.render('index', { title: `Something went wrong`, username: `${0}` });
            console.log('Something went wrong!')
        })
    })
    .post('/', urlencodedParser, async function(req, res) {
        let discordID = req.body.discordID;
        userManager.fetch(discordID).then(discordUser => {
            console.log(discordUser.flags)
            calculateBadges(discordUser.flags, badgesMap)

            res.render('index', { title: `After Call #${timesCalled}`, username: `${discordUser.username}`, discriminator: `${discordUser.discriminator}`, avatar: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`, isBot: discordUser.bot });
        }).catch(err => {
            res.render('index', { title: `Something went wrong`, username: `${0}` });
            console.log('Something went wrong!')
        })
        timesCalled++;
    })

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})

// Login Discord Bot 
client.login(process.env.BOT_TOKEN);

// Run when Discord Bot logs in
client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    // let userID = '278240897773076480';
});

function calculateBadges(flags, badgesMap) {
    let booleanArray = [];
    badgesMap.forEach((value, key) => {
        if ((flags & value) == value) {
            booleanArray.push(true);
        } else {
            booleanArray.push(false)
        }
        console.log(key)
    });

    //TODO: i left here, let the page show the right badges
    console.log(booleanArray)

}

function initializeBadgeMap() {
    let badges = new Map()
    badges.set('Discord_Employee', 1)
    badges.set('Partnered_Server_Owner', 2)
    badges.set('HypeSquad_Events', 4)
    badges.set('Bug_Hunter_Level_1', 8)
    badges.set('House_Bravery', 64)
    badges.set('House_Brilliance', 128)
    badges.set('House_Balance', 256)
    badges.set('Early_Supporter', 512)
    badges.set('Bug_Hunter_Level_2', 16384)
    badges.set('Early_Verified_Bot_Developer', 131072)
    return badges;
}