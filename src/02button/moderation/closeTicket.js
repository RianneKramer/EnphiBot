const {modRole} = require('../../../config.json');
const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    name: 'closeTicket',
    callback: async (client, interaction) => {

        const ticketChannel = interaction.channel;
        const ticketOwner = ticketChannel.name.split("s-ticket")[0];
        const ticketOwnerId = interaction.guild.members.cache.find(member => member.user.username === ticketOwner).id;

        const modal = new ModalBuilder()
            .setCustomId('closeTicket')
            .setTitle('Close Ticket');
        const reasonInput = new TextInputBuilder()
            .setCustomId('reasonInput')
            .setLabel('Reason for closing the ticket')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);
        const feedbackInput = new TextInputBuilder()
            .setCustomId('feedbackInput')
            .setLabel('Feedback (optional)')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false);

        // Check if the user has the required role
        if (!interaction.member.roles.cache.has(modRole)) {
            return interaction.reply({ content: 'You do not have permission to close this ticket.', flags: 64 });
        }
    }
};