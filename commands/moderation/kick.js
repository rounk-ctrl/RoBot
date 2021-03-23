const Discord = require('discord.js');
module.exports = {
	name: 'kick',
	description: 'Kicks a member.',
	guildOnly: true,
  cooldown: 1,
  aliases: [],
  usage: '[user]',
  permissions: 'KICK_MEMBERS',
	execute(message, args) {
		const user = message.mentions.users.first();
      if (user) {
      const member = message.guild.members.resolve(user);
      if (member) {
        member
          .kick()
          .then(() => {
            let success = new Discord.MessageEmbed()
              .setTitle('Kick')
              .setColor('#0099ff')
              .setDescription(`✅ Successfully kicked ${user.tag}`)
              .setTimestamp()
              .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
            message.channel.send(success);
          })
          .catch(err => {
            let fail = new Discord.MessageEmbed()
              .setTitle('Kick')
              .setColor('#0099ff')
              .setDescription('❌ Failed to kick member.')
              .setTimestamp()
              .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
            message.channel.send(fail);
            console.error(err);
          });
      } else {
        let notfound = new Discord.MessageEmbed()
          .setTitle('Kick')
          .setColor('#0099ff')
          .setDescription(`❌ User not found in this guild.`)
          .setTimestamp()
          .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
        message.channel.send(notfound);
      }
    } else {
      let nouser = new Discord.MessageEmbed()
        .setTitle('Kick')
        .setColor('#0099ff')
        .setDescription(`❌ You didn\'t mention the user to kick!`)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'png' }));
      message.channel.send(nouser);
    }
  }
};