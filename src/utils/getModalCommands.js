const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
    let localModalCommands = [];

    const commandModalCategories = getAllFiles(
        path.join(__dirname, '..', '03modals'),
        true
    );

    for (const commandModalCategory of commandModalCategories) {
        const commandModalFiles = getAllFiles(commandModalCategory);

        for (const commandModalFile of commandModalFiles) {
            const commandModalObject = require(commandModalFile);

            if (exceptions.includes(commandModalObject.name)) {
                continue;
            }
            
            localModalCommands.push(commandModalObject);
            //console.log(`${commandButtonFile}`)
        }
    }

    return localModalCommands;
};