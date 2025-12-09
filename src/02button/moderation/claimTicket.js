const {modRole} = require('../../../config.json');

module.exports = {
    name: 'claimTicket',
    callback: async (client, interaction) => {

        const claimerId = interaction.user.id;
        const ticketChannel = interaction.channel;
        const ticketOwner = ticketChannel.name.split(`-s-ticket`)[0];
        const ticketOwnerId = interaction.guild.members.cache.find(member => member.user.username === ticketOwner).id;

        if (!interaction.member.roles.cache.has(modRole)) {
            return interaction.reply({ content: 'You do not have permission to claim this ticket.', flags: 64 });
        }

        try {
            await ticketChannel.permissionOverwrites.edit(ticketOwnerId, {
                SendMessages: true,
            });
            await ticketChannel.permissionOverwrites.edit(claimerId, {
                SendMessages: true,
            });

            await interaction.message.reply(`Ticket claimed by ${interaction.user}`);
            
        } catch (error) {
            console.log('There was an error claiming the ticket: ', error);
        }
        
    }
}