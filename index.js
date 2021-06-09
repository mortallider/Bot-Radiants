const express = require('express');
const app = express();
const prefix = process.env.PREFIX || "?";
const guild_id = process.env.GUILD_ID;
const verified_role_id = process.env.ROLE_ID;
const verification_channel_id = process.env.CHANNEL_ID;

app.get('/', (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(
    `Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const fs = require("fs")
const Discord = require('discord.js'); //Conexão com a livraria Discord.js
const jimp =require("jimp")
const client = new Discord.Client(); //Criação de um novo Client
const config = require('./config.json'); //Pegando o prefixo do bot para respostas de comandos
 
client.on("message", async message => {
  const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
  if (regex.exec(message.content)) {
    await message.delete({timeout: 1000});
      await message.channel.send(
        `${message.author} **você não pode postar link de outros servidores aqui!**`
      );
  }
});

client.on('message', message => {
          if (message.author.bot) return;
          if (message.channel.type == 'dm') return;
          if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase()))
            return;
          if (
            message.content.startsWith(`<@!${client.user.id}>`) ||
            message.content.startsWith(`<@${client.user.id}>`)
          )
            return;

          const args = message.content
            .trim()
            .slice(config.prefix.length)
            .split(/ +/g);
          const command = args.shift().toLowerCase();

          try {
            const commandFile = require(`./commands/${command}.js`);
            commandFile.run(client, message, args);
          } catch (err) {
            console.error('Erro:' + err);
          }
        });        

client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("818494502158729226");
  let channel = await client.channels.cache.get("818494502158729226");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "smilee");
  if (guild != member.guild) {
    return console.log("Parece que alguém entrou do SV!");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`${emoji} Boas-vindas ${emoji}`)
      .setImage("https://imgur.com/3vYVlHb.gif")
      .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Testes")
      .setTimestamp();

    channel.send(embed);
  }
});
client.on("guildMemberRemove", async (member) => { 

  let guild = await client.guilds.cache.get("818494502158729226");
  let channel = await client.channels.cache.get("818507305262776351");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "smilee");
  if (guild != member.guild) {
    return console.log("Parece que alguém saiu do SV!");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`${emoji} Adeus! ${emoji}`)
      .setImage("https://media.giphy.com/media/brsEO1JayBVja/giphy.gif")
      .setDescription(`**${member.user.username}**, saiu do servidor! :broken_heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Bye my friend! Volta sempre.")
      .setTimestamp();

    channel.send(embed);
  }
});

client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token