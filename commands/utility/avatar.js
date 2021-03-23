const Discord = require('discord.js');
module.exports = {
	name: 'avatar',
    cooldown: 1,
	description: 'Gets the avatar.',
	aliases: ['icon', 'pfp'],
    usage: '[user]',
	execute(message) {
        let member = message.mentions.members.first() || message.member
        let user = member.user;
        const webp = user.displayAvatarURL({ format: 'webp'})
        const png = user.displayAvatarURL({ format: 'png'})
        const jpg = user.displayAvatarURL({ format: 'jpg'})
        let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${user.username}'s avatar`)
        .addFields(
            { name: 'Formats:', value: `[WEBP](${webp}) | [PNG](${png}) | [JPG](${jpg})`})
        .setImage(user.displayAvatarURL({ format: 'png' }))
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
    message.channel.send(embed);
	},
};