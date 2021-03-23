const { prefix } = require('../../config.json');
const Discord = require('discord.js');
module.exports = {
    name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 1,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push(commands.map(command => command.name).join(', '));
			let embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Help')
			.addFields(
				{name: 'Commands:', value: data},
				{name: '_ _', value: `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`})
				.setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
			return message.channel.send(embed)
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			let notfound = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Help')
			.setDescription(`\`${name}\` is not a valid command!`)
			.setTimestamp()
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));	
			return message.channel.send(notfound);
		}

		let commandsList = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Help')
		.addFields(
			{name: `Command: \`${command.name}\``, value: `**Aliases:** ${command.aliases.join(', ')}\n**Description:** ${command.description}\n**Usage:** ${prefix}${command.name} ${command.usage}`}
		)
		.setTimestamp()
		.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));	
		message.channel.send(commandsList);
	},
};