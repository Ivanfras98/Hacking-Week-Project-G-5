// To start the app type in the terminal npm run devStart (devStart is the key to start the "nodemon bot.js", look it up in the package.json file)
const fetch = require("node-fetch");
require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({
  allowedMentions: {
    parse: [`users`, `roles`],
    repliedUser: true,
  },
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_PRESENCES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
  ],
});
//Prefissi per i comandi
const PREFIX = "!";
//Comandi available
const MODCOMMAND = "mod me";
//Log per vedere se l'app parte
client.on("ready", () => {
  console.log("ciao sono un bot");
});

const apiData = "https://api.spaceflightnewsapi.net/v3/";

async function getApi() {
  const fetchData = await fetch(`${apiData}articles?_limit=10`);
  const data = await fetchData.json();
  return data;
}

client.on("message", (msg) => {
  if (msg.content === "/articles") {
    let ids = [];
    getApi().then((data) => {
      data.forEach((element) => {
        ids.push(element.id);
      });
      msg.reply(ids.join(", "));
    });
  }
  if (msg.content === "/articles/authors") {
    let authors = [];
    let lonelyAuthors = [];
    getApi().then((data) => {
      data.forEach((elem) => {
        if (!authors.find((e) => e === elem.newsSite)) {
          authors.push(elem.newsSite);
        }
      });
      msg.reply(authors.join(", "));
    });
  }
  getApi().then((data) => {
    console.log(data);
    data.forEach((element) => {
      if (msg.content === `/articles/${element.id}`) {
        msg.reply(element.summary);
      }
    });
  });
});

client.login(process.env.BOT_TOKEN);
