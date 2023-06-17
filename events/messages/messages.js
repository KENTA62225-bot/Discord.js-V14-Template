const fs = require('node:fs')
module.exports = function (client) {
    const messageFiles = fs.readdirSync('./events/messages/message').filter(file => file.endsWith('.js'));
    for (const file of messageFiles) {
        const messages = require(`./message/${file}`);
        client.on('messageCreate', message => {
            if (message.author.bot) return;
            messages(client, message)
        });
    }
}