const Discord = require('discord.js');
var moment = require('moment'); 
module.exports = {
	name: 'userinfo',
	cooldown: 1,
	description: 'Gets information from a user',
    aliases: ['ui'],
    usage: '[user]',
	execute(message, args) {
        let member = message.mentions.members.first() || message.member
        let user = member.user;
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString());
        let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(user.tag)
        .setThumbnail(user.displayAvatarURL({ format: 'png' }))
        .addFields(
            {name: ':date: Created at', value: moment.utc(user.createdAt).format('YYYY-MM-DD HH:MM:SS UTC') + '\n' + moment.utc(user.createdTimestamp).fromNow()},
            { name: ':date: Joined at', value: moment.utc(member.joinedAt).format('YYYY-MM-DD HH:MM:SS UTC') + '\n' + moment.utc(member.joinedTimestamp).fromNow()},
            {name: ':scroll: Roles', value: `${roles.length < 10 ? roles.join(' ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`})
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
    
    message.channel.send(embed);

}}