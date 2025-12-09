const {modRole} = require('../../../config.json');
const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const { remove } = require('../../tickets/store.js');

module.exports = {
    name: 'deleteTicket',
    callback: async (client, interaction) => {

        // Check if the user has the required role
        if (!interaction.member.roles.cache.has(modRole)) {
            return interaction.reply({ content: 'You do not have permission to delete this ticket.', flags: 64 });
        }

        remove(interaction.channel.id);
        // Delete the ticket channel
        await interaction.channel.delete('Ticket deleted by moderator').catch(() => {});
    }
}