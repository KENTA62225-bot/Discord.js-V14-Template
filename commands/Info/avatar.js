const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('ユーザーのアバターを取得')
        .addUserOption(option => 
			option
			.setName('target')
			.setDescription('アバターを取得する人')
            .setRequired(true)
		)
		.setDMPermission(false),

	async execute(interaction) {
        const user = interaction.options.getMember('target');

		const embed = new EmbedBuilder()
		.setTitle('> Avatar')
        .setImage(user.displayAvatarURL())
		.setFooter({ text: `${interaction.client.user.tag}`, iconURL: `${interaction.client.user.displayAvatarURL()}`})
		.setTimestamp()
        .setColor(color);

		return interaction.reply({ embeds: [embed]})
	}
};
