const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log(`${commands.length} 個のスラッシュコマンドの登録を開始しました。 | ${new Date().toLocaleString('js-JP', { timeZone: 'Asia/Tokyo'})}`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`${data.length} 個のスラッシュコマンドの登録が正常に完了しました。 | ${new Date().toLocaleString('js-JP', { timeZone: 'Asia/Tokyo'})}`);
	} catch (error) {
		console.error(error);
	}
})();
