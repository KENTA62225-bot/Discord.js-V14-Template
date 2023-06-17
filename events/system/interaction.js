const { Events, EmbedBuilder } = require('discord.js');
const { DiscordTimestamp, StyleType } = require('timecord');
const { color } = require('../../config.json');

module.exports = function ready(client) {
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isCommand()) return;
    
        const command = client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        const msg = '```';
    
        try {
            await command.execute(interaction);
    
            const options = interaction.options.data.map(option => {
                return `${option.name}: ${msg}${option.value}${msg}`;
            }).join((''));
    
            const gName = interaction.guild?.name || 'DM';
            const cName = interaction.channel?.name || '...';
            const gId = interaction.guild?.id || '...';
            const cId = interaction.channel?.id || '...';
    
            const timestamp = new DiscordTimestamp(new Date(), StyleType.ShortDateAndTime).format();
    
            const embed = new EmbedBuilder()
                .setTitle('> Command Log [/]')
                .setFields(
                    {name: `Command`, value: `${msg}${interaction.commandName}${msg}`},
                    {name: `Options`, value: `${options || `${msg}none${msg}`}`},
                    {name: `Location`, value: `[${gName} - ${cName}](https://discord.com/channels/${gId}/${cId})`},
                    {name: `Time`, value: `${timestamp}`},
                    )
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                .setFooter({ text: `${interaction.client.user.tag}`, iconURL: `${interaction.client.user.displayAvatarURL()}`})
                .setTimestamp()
                .setColor(color);
    
            client.channels.cache.get('1059491396710568011').send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
    
            const embed = new EmbedBuilder()
                .setTitle('> Error')
                .setDescription(`${msg}${error}${msg}`)
                .setFooter({ text: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp()
                .setColor(color);
    
            client.channels.cache.get('1059602502036758609').send({ embeds: [embed]});
    
            await interaction.reply({
                content: 'エラーが発生したためコマンドを実行することができませんでした。\n/report で ``KENTA62225#4137`` に問い合わせるか時間が経過してから実行してください。\n(開発中で使用できないコマンドもあります。)',
                ephemeral: true
            });
        }
    });
}