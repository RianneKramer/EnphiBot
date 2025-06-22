const {modRole} = require('../../../config.json');

module.exports = {
    name: 'claimTicket',
    callback: async (client, interaction) => {

        const claimer = interaction.user;
        const ticketChannel = interaction.channel;
        //const ticketOwner = ticketChannel.name.split("'s")[0];
        //const ticketOwnerId = interaction.guild.members.cache.find(member => member.user.username === ticketOwner).id;

        if (!claimer.roles.cache.has(modRole)) {
            return interaction.reply({ content: 'You do not have permission to claim this ticket.', flags: 64 });
        }

        try {
            interaction.message.send('Ticket claimed by ' + interaction.user.username);
            await ticketChannel.permissionOverwrites.edit(ticketOwnerId, {
                SendMessages: true,
            });
            await ticketChannel.permissionOverwrites.edit(claimer.id, {
                SendMessages: true,
            });
            
        } catch (error) {
            console.log('There was an error claiming the ticket: ', error);
        }
        
    }
}