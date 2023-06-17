const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('埋め込みメッセージ')
                .addStringOption(option => 
			option
			.setName('message')
			.setDescription('内容')
                        .setRequired(true)
		)
		.setDMPermission(false),

	async execute(interaction) {
		const message = interaction.options.getString('message');

		const embed = new EmbedBuilder()
		.setDescription(`${message}`)
		.setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
		.setFooter({ text: `${interaction.client.user.tag}`, iconURL: `${interaction.client.user.displayAvatarURL()}`})
		.setTimestamp()
		.setColor(color);

		await interaction.reply({ embeds: [embed]})
	}
};
