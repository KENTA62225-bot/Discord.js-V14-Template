const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color, ownerid, owneridsub } = require('../../config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('ユーザー情報コマンド')
		.addUserOption(option => 
			option
			.setName('target')
			.setDescription('情報を取得したいユーザー')
		)
		.setDMPermission(false),

	async execute(interaction) {

		const member = interaction.options.getMember('target') || interaction.member;

		const embed = new EmbedBuilder()
		.setTitle(`> User Info`)
		.setDescription(`【 **__${member.user.tag}__** 】`)
		.setThumbnail(member.user.displayAvatarURL())
	    .setFields(
			{ name: `-ユーザーID`, value: `${member.user.id}`},
			{ name: `-アカウント作成日`, value: `${member.user.createdAt.toLocaleString()}`},
			{ name: `-参加日`, value: `${member.joinedAt.toLocaleString()}`},
			{ name: `-ロール`, value: `${member.roles.cache.map(role => role.name)}`},
		)
		.setFooter({ text: `${interaction.client.user.tag}`, iconURL: `${interaction.client.user.displayAvatarURL()}`})
		.setTimestamp()
	    .setColor(color);

		return interaction.reply({ embeds: [embed] });
	},
};