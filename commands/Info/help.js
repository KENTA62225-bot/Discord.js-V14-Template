const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require('../../config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('…')
		.addStringOption(option =>
			option
			.setName('type')
			.setDescription('コマンドのタイプ')
			.addChoices(
				{name: '一般', value: 'general'},
				{name: 'コマンドリスト', value: 'cmdlist'},
			)
			.setRequired(true)
		),
		
	async execute(interaction) {
		const type = interaction.options.getString('type')

		if (type === 'general'){

			const embed = new EmbedBuilder()
			.setTitle(`> Help`)
			.setDescription(`バグ、要望は下記に連絡してください。\nDiscord: KENTA62225#4137\nTwitter: @KENTA62225`)
			.setFooter({ text: `${interaction.client.user.tag}`, iconURL: `${interaction.client.user.displayAvatarURL()}`})
			.setTimestamp()
			.setColor(color);

			interaction.reply({ embeds: [embed] });

		} else if (type === 'cmdlist'){
			const commands = await interaction.client.application.commands.fetch();

			const embed = new EmbedBuilder()
		        .setTitle(`> Help - Commands List [${commands.size}]`)
			.setDescription(commands.map(command => `${command.name} : ${command.description}`).sort().join(',\n'))
		        .setFooter({ text: `${interaction.client.user.tag}`, iconURL: `${interaction.client.user.displayAvatarURL()}`})
		        .setTimestamp()
	                .setColor(color);

			interaction.reply({ embeds: [embed] });

		}
	},
};
