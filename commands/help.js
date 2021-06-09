const Discord = require("discord.js");
 
exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('#08ddf5')
    .setDescription(` Minha lista de comandos ${message.author}`)
    .setTimestamp()
    .setFooter(` Comando feito pelo usuario: ${message.author.username} `)
    .addFields(
        {
            name: '+limpar',
            value: `Serve para limpar 0-99 mensagens num canal`,
            inline: true
        },
        {
            name: '+beijo',
            value: `Comando de diversão, para dar um beijo a um @user`,
            inline: true
        },
        {
            name: '+avatar',
            value: `Comando de diversão, para ver avatar de um @user`,
            inline: true
        },
        {
            name: '+moedaaoar',
            value: `Comando de diversão, para atirar uma moeda ao ar, necessário dizer cara ou coroa.`,
            inline: true
        },
        {
            name: '+ping',
            value: `Use para ver meu ping e o do servidor.`,
            inline: true
        },
        {
            name: '+sugerir',
            value: `Use para sugerir algo para o canal de sugestões.`,
            inline: true
        },
        {
            name: '+uptime',
            value: `Use para ver à quanto tempo estou online.`,
            inline: true
        },
    
    
    )
    message.channel.send(embed);
    message.delete().catch(O_o => { });
}