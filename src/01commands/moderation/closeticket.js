const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const targetUser = interaction.options.get('ticket-creator').user;
        const resolved = interaction.options.get('resolved').value ? 'Yes' : 'No';
        const reason = interaction.options.get('reason')?.value || 'No reason provided';

        await interaction.deferReply({ flags: 64 });

        const currentChannel = interaction.channel.name;

        if (!currentChannel.includes('ticket')) {
            await interaction.editReply({ content: 'This command can only be used in ticket channels.', flags: 64 });
            return;
        }

        if (!targetUser) {
            await interaction.editReply({ content: "This user doesn't exist in this server.", flags: 64 });
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle('Your Ticket Has Been Closed')
            .setColor(0xFF0000)
            .addFields(
                {
                    name: 'Mod that handled it:',
                    value: interaction.user.username
                },
                { 
                    name: 'Resolved?', 
                    value: resolved 
                },
                { 
                    name: 'Reason:', 
                    value: reason 
                }
            )
            .setTimestamp();

        try {
            // Send the embed as a DM to the ticket creator
            await targetUser.send({ embeds: [embed] });

            // Confirm the action in the channel
            await interaction.editReply({ content: 'The ticket has been closed and the user has been notified.', flags: 64 });

            // Delete the ticket channel
            await interaction.channel.delete();
        } catch (error) {
            console.error(`Failed to send DM or close the ticket: ${error}`);
            await interaction.editReply({ content: 'There was an error closing the ticket.', flags: 64 });
        }
    },

    name: 'closeticket',
    description: 'Close the ticket',
    options: [
        {
            name: 'ticket-creator',
            description: 'The person who created the ticket',
            type: ApplicationCommandOptionType.Mentionable,
            required: true
        },
        {
            name: 'resolved',
            description: 'Is this ticket resolved?',
            type: ApplicationCommandOptionType.Boolean,
            required: true
        },
        {
            name: 'reason',
            description: 'Why do you want to close this ticket',
            type: ApplicationCommandOptionType.String
        }
    ],
    permissionsRequired: [PermissionFlagsBits.ManageChannels],
    botPermissions: [PermissionFlagsBits.ManageChannels]
};