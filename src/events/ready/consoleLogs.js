const { ActivityType, WelcomeChannel, EmbedBuilder } = require('discord.js');
const { welcomeChannel } = require('../../../config.json')

module.exports = (client) => {
    console.log(`${client.user.tag} is online.\nYou are on the ALPHA branch, this is only for development and testing purposes`);
    client.user.setActivity({
        name: "Enphia",
        type: ActivityType.Listening,
    });

    client.on('guildMemberAdd', (member) => {
        const channelId = welcomeChannel; // Replace with the ID of the channel where the message should be sent
        const channel = member.guild.channels.cache.get(channelId);

        if (channel) {
            const embed = new EmbedBuilder()
                .setTitle('Welcome to the server')
                .setDescription(`Hello ${member.user}, welcome to the server! 🎉`)
                .setColor(0xf5ecaa)
                .setTimestamp()
                .setFooter({ text: 'We hope you enjoy your stay!' });
            channel.send({embeds: [embed]});
        } else {
            console.error('Channel not found!');
        }
    });
};