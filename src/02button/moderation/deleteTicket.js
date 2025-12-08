const {modRole} = require('../../../config.json');
const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const { callback } = require('./claimTicket');

module.exports = {
    name: 'deleteTicket',
    callback: async (client, interaction) => {

        // Check if the user has the required role
        if (!interaction.member.roles.cache.has(modRole)) {
            return interaction.reply({ content: 'You do not have permission to close this ticket.', flags: 64 });
        }

        await interaction.reply({content: 'Not yet implemented', flags: 64})
    }
}