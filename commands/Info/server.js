const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('サーバー情報コマンド')
		.setDMPermission(false),
		
	async execute(interaction) {

		const embed = new EmbedBuilder()
		.setTitle(`> Server Info`)
		.setDescription(`【 **__${interaction.guild.name}__** 】`)
		.setThumbnail(interaction.guild.iconURL())
	    .setFields(
			{ name: `-サーバーID`, value: `${interaction.guild.id}`},
			{ name: `-サーバーオーナー`, value: `<@${interaction.guild.ownerId}>`},
			{ name: `-サーバー作成日`, value: `${interaction.guild.createdAt.toLocaleString()}`},
			{ name: `-メンバー数`, value: `${interaction.guild.memberCount} 人`},
			{ name: `-チャンネル数`, value: `${interaction.guild.channels.cache.size} チャンネル`},
			{ name: `-ロール数`, value: `${interaction.guild.roles.cache.size} 個`},
			{ name: `-絵文字数`, value: `${interaction.guild.emojis.cache.size} 個`}
		)
		.setFooter({ text: `${interaction.client.user.tag}`, iconURL: `${interaction.client.user.displayAvatarURL()}`})
		.setTimestamp()
	    .setColor(color);

		return interaction.reply({ embeds: [embed] });
	},
};
