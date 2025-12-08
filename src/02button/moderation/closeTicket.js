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

        try {
        // Create a modal to close the ticket
            modal.addComponents(
                new ActionRowBuilder().addComponents(reasonInput),
                new ActionRowBuilder().addComponents(feedbackInput)
            );

            // Show the modal to the user
            await interaction.showModal(modal);

            // Wait for the modal submission
            const filter = (i) => i.customId === 'closeTicket' && i.user.id === interaction.user.id;
            const submittedInteraction = await interaction.awaitModalSubmit({ filter, time: 60000 });

            // Get the reason and feedback from the modal
            const reason = submittedInteraction.fields.getTextInputValue('reasonInput');
            const feedback = submittedInteraction.fields.getTextInputValue('feedbackInput');

            // Notify the ticket owner
            const embed = {
                title: 'Your Ticket Has Been Closed',
                color: 0xFF0000,
                fields: [
                    { name: 'Mod that handled it:', value: interaction.user.username },
                    { name: 'Reason:', value: reason },
                    { name: 'Feedback:', value: feedback || 'No feedback provided' }
                ],
                timestamp: new Date()
            };

            // Reply to the interaction
            await submittedInteraction.reply({ content: 'The ticket has been closed and the user has been notified.\nThe channel will close in 24 hours'});

            // Send the embed as a DM to the ticket creator
            await interaction.guild.members.cache.get(ticketOwnerId).send({ embeds: [embed] });

            // await ticketChannel.delete();

        } catch (error) {
            console.error('There was an error closing the ticket:', error);
            await interaction.reply({ content: 'There was an error closing the ticket. Please try again later.', flags: 64});
        }
    }
};