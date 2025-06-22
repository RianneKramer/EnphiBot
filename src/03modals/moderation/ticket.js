const { ChannelType, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { modRole } = require('../../../config.json')

module.exports = {
    name: 'ticket',

    callback: async (client, interaction) => {

        const ticketChannel = await interaction.guild.channels.create({
            name: `${interaction.user.username}'s ticket`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: modRole,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                    deny: [PermissionsBitField.Flags.SendMessages]
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                    deny: [PermissionsBitField.Flags.SendMessages]
                }
            ]
        });

        await ticketChannel.send(`Hello ${interaction.user}, a staff member will be with you shortly.`);

        const reason = interaction.fields.getTextInputValue('reasonInput');
        const description = interaction.fields.getTextInputValue('description');

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username}'s ticket`)
            .setColor(0xfcd803)
            .addFields({
                name: 'Reason',
                value: reason,
            },
                {
                    name: 'Description',
                    value: description,
                });
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('claimTicket')
                    .setLabel('Claim')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('👤'),
                new ButtonBuilder()
                    .setCustomId('closeTicket')
                    .setLabel('Close')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('🔒'),
            );

        await ticketChannel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: 'Your ticket has been created!', flags: 64 });
    }
}
