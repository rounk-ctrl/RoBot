const Discord = require('discord.js');
module.exports = {
	name: 'ping',
	cooldown: 1,
	aliases: [],
	description: 'Ping!',
	usage: '',
	execute(message, args) {
		let embed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(':ping_pong: Pong!')
		.addFields(
			{ name: 'Latency:', value: `${message.createdTimestamp - Date.now()}ms`},
			{name: 'API Latency:', value: `${Math.round(message.client.ws.ping)}ms`}
		)
	    .setTimestamp()
		.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
		message.channel.send(embed);
	},
};	