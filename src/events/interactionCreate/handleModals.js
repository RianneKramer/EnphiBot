const getModalCommands = require('../../utils/getModalCommands');

module.exports = async (client, interaction) => {
    if (!interaction.isModalSubmit()) return;

    const ModalCommands = getModalCommands();

    try {
        const commandModalObject = ModalCommands.find(
            (mdl) => mdl.name === interaction.customId
        );

        if (!commandModalObject) return console.log(`unknown modal ID: ${interaction.customId}`);

        await commandModalObject.callback(client, interaction);

    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
}