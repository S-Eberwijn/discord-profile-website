const { UserManager } = require('discord.js');

const badgesMap = initializeBadgeMap();

exports.userById = (req, res) => {
    const client = require('../index');
    const userManager = new UserManager(client);
    let discordID = req.params.id;
    userManager.fetch(discordID).then(discordUser => {
        res.render('usersPage', { isUserPage: true, user: discordUser, avatar: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`, badges: calculateBadges(discordUser.flags) });
    }).catch(err => {
        res.render('usersPage', { isUserPage: true, error: `User not found` });
        console.log('User not found!')
    })
}

exports.redirectToUserById = (req, res) => {
    const client = require('../index');
    res.redirect(`/users/${client.user.id}`);
}

exports.postUserById = (req, res) => {
    res.redirect(`/users/${req.body.discordID}`);
}

function calculateBadges(flags) {
    let badgeImagePaths = [];
    badgesMap.forEach((value, key) => {
        if ((flags & value) == value) {
            badgeImagePaths.push(`/badges/${key}.png`);
        }
    });
    return badgeImagePaths;
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