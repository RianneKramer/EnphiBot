const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'closeTicket',

    callback: async (client, interaction) => {
        try {
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

            // Send the embed as a DM to the ticket creator
            await interaction.guild.members.cache.get(ticketOwnerId).send({ embeds: [embed] });

            // await ticketChannel.delete();

            // Reply to the interaction
            await submittedInteraction.reply({ content: 'The ticket has been closed and the user has been notified.', flags: 64 });

        } catch (error) {
            console.error('There was an error closing the ticket:', error);
            await interaction.reply({ content: 'There was an error closing the ticket. Please try again later.', ephemeral: true });
        }
    }
}