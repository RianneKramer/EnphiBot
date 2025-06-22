const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'ticket',
    description: 'Open a ticket',
    devOnly: true,
    callback: async (client, interaction) => {
        interaction.deferReply({ flags: 64 })

        const embed = new EmbedBuilder()
            .setTitle('Ticket System')
            .setDescription('Need assistance? Click the button below to create a support ticket. Our team will assist you shortly.');
        const button = new ButtonBuilder()
            .setCustomId('ticket')
            .setLabel('Open Ticket')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('📩');

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.channel.send({ embeds: [embed], components: [row] });
        await interaction.deleteReply();
    }
}