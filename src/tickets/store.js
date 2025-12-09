const fs = require('fs');
const path = require('path');

const DB = path.join(__dirname, 'tickets.json');

function load() {
    try { return JSON.parse(fs.readFileSync(DB, 'utf8')); }
    catch { return { deletes: [] }; }
}

function save(data) {
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

function schedule(channelId, deleteAt) {
    const db = load();
    const item = db.deletes.find(d => d.channelId === channelId);
    if (item) item.deleteAt = deleteAt;
    else db.deletes.push({ channelId, deleteAt });
    save(db);
}

function due(now = Date.now()) {
    const db = load();
    const ready = db.deletes.filter(d => d.deleteAt <= now);
    db.deletes = db.deletes.filter(d => d.deleteAt > now);
    save(db);
    return ready;
}

function remove(channelId) {
    const db = load();
    db.deletes = db.deletes.filter(d => d.channelId !== channelId);
    save(db);
}

module.exports = { schedule, due, remove };