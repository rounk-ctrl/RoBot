const Discord = require('discord.js');
module.exports = {
	name: 'info',
    aliases: [],
	cooldown: 1,
	description: 'Information about the bot.',
    usage: '',
	execute(message, args) {
        let embed = new Discord.MessageEmbed()
        .setTitle('Bot Info')
        .setColor('#0099ff')
        .addFields(
            {name: 'Name', value: 'RoBot'},
            {name: 'Version', value: '1.0'},
            {name: 'Libraries used', value: `\`\`\`Discord.JS - 12.5.1\nMomentJS - 2.29.1\`\`\``}
        )
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
        message.channel.send(embed);
}}