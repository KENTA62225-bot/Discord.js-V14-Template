const { Events } = require('discord.js');

module.exports = function ready(client) {
    client.once(Events.ClientReady, () => {
        const d = new Date().toLocaleString('js-JP', { timeZone: 'Asia/Tokyo'})
        console.log(`${client.user.tag} has logged in. | ${d}`);
        
        client.user.setPresence({
            activities: [{ name: `Discord`}],
            status: 'online',//'online' or 'idle' or 'dnd' or 'invisible'
        });
    });
}
