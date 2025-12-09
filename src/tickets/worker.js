const { due } = require('./store');

function startTicketWorker(client) {
    setInterval(async () => {
        const ready = due(Date.now());
        for (const { channelId } of ready) {
            const channel = await client.channels.fetch(channelId).catch(() => null);
            if (!channel) continue;
            await channel.delete('Auto-delete 24h after close').catch(() => {});
        }
    }, 60_000); // every minute
}

module.exports = { startTicketWorker };