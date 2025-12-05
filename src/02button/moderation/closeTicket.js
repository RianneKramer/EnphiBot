const {modRole} = require('../../../config.json');
const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    name: 'closeTicket',
    callback: async (client, interaction) => {

        try {
            const ticketChannel = interaction.channel;
            const ticketOwner = ticketChannel.name.split("s-ticket")[0];
            // console.log(`Ticket owner: ${ticketOwner}`);
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

            // Create a modal to close the ticket
            modal.addComponents(
                new ActionRowBuilder().addComponents(reasonInput),
                new ActionRowBuilder().addComponents(feedbackInput)
            );

            // Show the modal to the user
            await interaction.showModal(modal);
        }
        } catch (error) {
            console.error('Error closing ticket:', error);
            await interaction.reply({ content: 'There was an error closing the ticket. Please try again later.', flags: 64 });
        }
    }
};