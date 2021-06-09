const { GuildManager } = require('discord.js');

exports.guildById = (req, res) => {
    const client = require('../index');
    const guildManager = new GuildManager(client);
    let discordID = req.params.id;
    guildManager.fetch(discordID).then(discordGuild => {
        res.render('guildsPage', { isGuildPage: true, guild: discordGuild, avatar: `${discordGuild.iconURL()}` });
    }).catch(err => {
        res.render('guildsPage', { isGuildPage: true, error: `Guild not found` });
        console.log('Guild not found!')
    })
}

exports.redirectToGuildById = (req, res) => {
    const client = require('../index');
    res.redirect(`/guilds/${client.guilds.cache.first().id}`);
}

exports.postGuildById = (req, res) => {
    res.redirect(`/guilds/${req.body.discordID}`);
}
