const { Events } = require('discord.js');

module.exports = function ready(client) {
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isCommand()) return;
    
        const command = client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
    
            await interaction.reply({
                content: 'エラーが発生したためコマンドを実行することができませんでした。',
                ephemeral: true
            });
        }
    });
}
