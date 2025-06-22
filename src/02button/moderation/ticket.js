const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    name: 'ticket',
    callback: async (client, interaction) => {

        const modal = new ModalBuilder()
            .setCustomId('ticket')
            .setTitle('Ticket');
        const title = new TextInputBuilder()
            .setCustomId('reasonInput')
            .setLabel('Reason for ticket')
            .setStyle(TextInputStyle.Short);
        const description = new TextInputBuilder()
            .setCustomId('description')
            .setLabel('Give a detailed description of the problem')
            .setStyle(TextInputStyle.Paragraph);

        modal.addComponents(
            new ActionRowBuilder().addComponents(title),
            new ActionRowBuilder().addComponents(description)
        );

        await interaction.showModal(modal);
    }
}