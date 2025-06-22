const { EmbedBuilder } = require('discord.js');

module.exports = {
    callback: async (client, interaction) => {
        await interaction.deferReply({
            flags: 64,
        })
        const embed = new EmbedBuilder()
            .setAuthor({
                name: 'Enphia',
                url: 'https://github.com/RianneKramer/',
            })
            .setTitle("Info about EnphiBot")
            .setThumbnail('https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDb6rYcBtJvTvH3UoAS4JFNDaxGhmKNaMwgElLURlRFeVkLCjkfnXmWtINWZIrPGYq0-&format=source')
            .setDescription(`Hi, I'm EnphiBot!\nI am a bot that is made to help you with your server.\nI can do a lot of things, but I am still learning.\nIf you have any suggestions, please let me know!`)
            .setColor(0x5865f2)
            .addFields({
                name: 'Farkle',
                value: 'By using the command /farkle you can start a game of farkle',
                inline: true
            },
            {
                name: 'Quit',
                value: 'By using the command /quit you can end a game of farkle',
                inline: true
            })
            .setFooter({
                text: 'You doofus!',
            })
            .setTimestamp();


        await interaction.editReply({ embeds: [embed] });
    },

    name: 'help',
    description: 'Sends an embedded help message',
};