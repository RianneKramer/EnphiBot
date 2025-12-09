require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const { startTicketWorker } = require('./tickets/worker');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
}); 

eventHandler(client);

client.once('clientReady', () => {
    startTicketWorker(client);
    console.log('Ticket worker started.');
});

client.login(process.env.TOKEN);

