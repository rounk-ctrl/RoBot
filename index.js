const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        let dm = new Discord.MessageEmbed()
		    .setColor('#0099ff')
		    .setTitle('Bruh')
	        .setDescription(`ℹ Please execute this command inside a guild.`)
		    .setTimestamp()
		    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
        return message.reply(dm);
    }

    if (command.permissions) {
         	const authorPerms = message.channel.permissionsFor(message.author);
         	if (!authorPerms || !authorPerms.has(command.permissions)) {
                let perms = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Error')
                    .setDescription(`❌ You don't have permissions to execute this command.`)
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
         	  	return message.reply(perms);
         	}
        }
    
    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            let time = new Discord.MessageEmbed()
		        .setColor('#0099ff')
		        .setTitle('Cooldown')
		        .setDescription(`ℹ Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
		        .setTimestamp()
		        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
            return message.reply(time);
        }
    }      
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
        let errr = new Discord.MessageEmbed()
	      .setColor('#0099ff')
		  .setTitle('Error')
		  .setDescription(`❌ Error while trying to execute command:\n\`\`\`${error}\`\`\``)
		  .setTimestamp()
		  .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
		message.reply(errr);
	}
});
client.login(token);
