const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
    let localButtonCommands = [];

    const commandButtonCategories = getAllFiles(
        path.join(__dirname, '..', '02button'),
        true
    );

    for (const commandButtonCategory of commandButtonCategories) {
        const commandButtonFiles = getAllFiles(commandButtonCategory);

        for (const commandButtonFile of commandButtonFiles) {
            const commandButtonObject = require(commandButtonFile);

            if (exceptions.includes(commandButtonObject.name)) {
                continue;
            }
            
            localButtonCommands.push(commandButtonObject);
            //console.log(`${commandButtonFile}`)
        }
    }

    return localButtonCommands;
};