require("dotenv").config({ path: `../.env` });
const { Client, IntentsBitField } = require("discord.js");

const coopRequestChannelId = "877091060101300274"; //coop-request channel
// const coopRequestChannelId = "1111523607554830376"; //bot-testing channel

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
});

client.on("ready", (bot) => {
  console.log(`${bot.user.username} is online`);
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.channel.id != coopRequestChannelId) {
    return;
  }

  if (reaction.emoji.name != "✅") {
    return;
  }

  client.channels.fetch(coopRequestChannelId).then((channel) => {
    channel.messages.delete(reaction.message.id);
  });
});

client.login(process.env.TOKEN_ID);
