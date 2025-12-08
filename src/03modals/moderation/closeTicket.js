const { ChannelType, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { modRole } = require('../../../config.json')

module.exports = {
    name: 'closeTicket',
    callback: async (client, interaction) => {
        
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
}
