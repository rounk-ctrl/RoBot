const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
	name: 'reload',
	aliases: [],
	description: 'Reloads a command',
	cooldown: 1,
	usage: '[command]',
	execute(message, args) {
		if (!args[0]) {
			let nocommand = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Reload')
			.setDescription(`ℹ Please specify a command to reload. \nReloading all commands is not currently implemented.`)
			.setTimestamp()
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));	
			return message.channel.send(nocommand);
		}
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			let notfound = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Reload')
			.setDescription(`ℹ There is no command with name or alias \`${commandName}\``)
			.setTimestamp()
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));	
			return message.channel.send(notfound);
		}
		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		let successembed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Reload')
		.setDescription(`✅ Command \`${command.name}\` was reloaded!`)
		.setTimestamp()
		.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));

		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(successembed);
		} catch (error) {
			console.error(error);
			let errorembed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Reload')
		.setDescription(`❌ There was an error while reloading the command \n\`${command.name}\`: \`\`\`${error.message}\`\`\``)
		.setTimestamp()
		.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
			message.channel.send(errorembed);
		}
	},
};
