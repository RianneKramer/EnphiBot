const getButtonCommands = require('../../utils/getButtonCommands');

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    const buttonCommands = getButtonCommands();

    try {
        const commandButtonObject = buttonCommands.find(
            (btn) => btn.name === interaction.customId
        );

        if (!commandButtonObject) return console.log(`unknown button ID: ${interaction.customId}`);

        await commandButtonObject.callback(client, interaction);

    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
}