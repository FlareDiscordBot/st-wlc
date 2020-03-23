// 
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://st-wlc.glitch.me/`);
}, 280000);

const { Client } = require("discord.js");
const { RichEmbed } = require("discord.js")
const { config } = require("dotenv");
const db = require("quick.db");
const ms = require("parse-ms")
const Discord = require("discord.js");
const discord = require("discord.js");
const Canvas = require('canvas');
const encode = require("strict-uri-encode");

    const fetch = require("node-fetch");
const moment = require("moment-timezone")
moment().tz("Asia/Riyadh").format();
  const leveling = require("./leveling.json");
const shorten = require("isgd");

    const { stripIndents } = require("common-tags");
const fs = require("fs")
let jdb = JSON.parse(fs.readFileSync("./database.json", "utf8"));
const h = require('nomsy-paste');// Declares our bot,
// the disableEveryone prevents the client to ping @everyone
const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
})

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    // Set the user presence
    client.user.setPresence({
        status: "dnd",
        game: {
            name: "S T A R T",
            type: "WATCHING"
        }
    }); 
  
 
})


function emoji(id) {
    return client.emojis.get(id);
  }

client.on("message", async message => {
    


    const prefix = "%"
 
  

   
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
 
    let sName = await db.fetch(`sName_${message.guild.id}`);
    if(sName === null) sName = "Hello !";
    let tMsg = await db.fetch(`tMsg_${message.guild.id}`);
    if(tMsg === null) tMsg = "Welcome, Please wait some time for stuff !";
    let tRole = await db.fetch(`tRole_${message.guild.id}`);
    if(tRole === null) tRole = "off";
    let aRole = await db.fetch(`aRole_${message.guild.id}`);
    if(aRole === null) aRole = "off";
    let tCate = await db.fetch(`tCate_${message.guild.id}`);
    if(tCate === null) tCate = "off";
    let tLog = await db.fetch(`tLog_${message.guild.id}`);
    if(tLog === null) tLog = "off";
    let wRoom = await db.fetch(`wRoom_${message.guild.id}`);
    if(wRoom === null) wRoom = "off";
    let tOn = await db.fetch(`tOn_${message.guild.id}`);
    if(tOn === null) tOn = "on"; 
    let open = await db.fetch(`Open_${message.author.id}`);
    if(open === null) open = "no";   
  
 
  let m = await db.fetch(`memberlog_${message.guild.id}`)
  if(m === null) m = "NO"
  
        if(cmd === "set-a-role") {
            if(!message.member.hasPermission("ADMINISTRATOR")) return;

            let role = message.mentions.roles.first() || message.guild.roles.get(args[0]);
            if(!role) message.reply(`${emoji("630249377621082124")} **- Please mention a role or give me role ID**`)
            db.set(`aRole_${message.guild.id}`, role.name);
            message.channel.send(`${emoji("666085646103871518")} **- Done, Auto role now is: ** ${role}`)
        }

if(cmd === "set-member") {
     if(!message.member.hasPermission("ADMINISTRATOR")) return;
     let room = message.mentions.channels.first() || message.guild.channels.get(args[0]);
     if(!room) return message.channel.send(`> **${emoji("630249377621082124")} - \`Please mention a channel !\`**`)
     
    db.set(`memberlog_${message.guild.id}`, room.name)
    message.channel.send(`> **${emoji("666085646103871518")} - \`Done, Successfully set a member logs channel to: [${room.name}]\`**`)
     
   }

 
    if(cmd === "set-wlc") {
        if(!message.member.hasPermission("ADMINISTRATOR")) return;

        let room = message.mentions.channels.first() || message.guild.channels.get(args[0]);
        if(!room) message.reply(`${emoji("630249377621082124")} **- Please mention a room or give me channel ID**`)
        db.set(`wRoom_${message.guild.id}`, room.name);
        message.channel.send(`${emoji("666085646103871518")} **- Done, Wlc channel now is:** ${room}`)
    }
    
    if(cmd === "info-") {
       let embed = new RichEmbed()
       .setTitle(`**${message.guild.name} - Settings**`)
       .setFooter(message.member.displayName, message.author.displayAvatarURL)
       .setDescription(`    
    
       ${emoji("666085809450909718")}**- Server Logs: ** \`${m}\`
       ${emoji("666085809450909718")}**- Wlc Room: ** \`${wRoom}\`
       ${emoji("666085809450909718")}**- Auto Role: ** \`${aRole}\`
       `)
        .setTimestamp()
        .setFooter(message.member.displayName, message.author.displayAvatarURL)

       message.channel.send(embed)

    }

  

    
    

});

  
client.on("guildMemberAdd", async member => {

    let aRole = await db.fetch(`aRole_${member.guild.id}`);

    let wRoom = await db.fetch(`wRoom_${member.guild.id}`);
    
     let fontSize5 = 30;


let channel = member.guild.channels.find("name", wRoom);

    const canvas = Canvas.createCanvas(720, 480);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./welcome.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#0066ff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 30;

	do {
		ctx.font = `${fontSize}px Comic Sans`;
	} while (ctx.measureText(text).width > canvas.width);

	return ctx.font;
};

const { registerFont, createCanvas } = require('canvas');
registerFont('fonts.ttf', { family: 'Comic Sans' })


    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#0066ff';
    ctx.textAlign = "center";
    ctx.fillText(`${member.displayName}!`, canvas.width / 1.7, canvas.height / 1.37);
    


    const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
    ctx.drawImage(avatar, 20, 230, 179, 179);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome.png');

  await channel.send(`**User: ${member}** \n **Prove: <#671173233323802624>**`, attachment)
  
    if(aRole !== "off") {
      
  let welcomerole1 = member.guild.roles.find(r => r.name === aRole);


  member.addRole(welcomerole1);
      
    }

 let memberlog = await db.fetch(`memberlog_${member.guild.id}`);
        if(memberlog === null) memberlog = "NO"

  

    let log = member.guild.channels.find("name", memberlog);
    let embed = new Discord.RichEmbed()
    .setTitle(`${emoji("666085646103871518")} **-Some one was joined !**`)
    .setDescription(`
    **- Name: ** ${member.user.username}
    **- ID: ** ${member.id}
    `)

    log.send(embed)
    
})
client.on("guildMemberRemove", async member => {

  let memberlog = await db.fetch(`memberlog_${member.guild.id}`);
        if(memberlog === null) memberlog = "NO"
  
    let tLog = await db.fetch(`tLog_${member.guild.id}`);
    if(tLog === null) tLog = "off";

    let log = member.guild.channels.find("name", memberlog);
    let embed = new Discord.RichEmbed()
    .setTitle(`${emoji("630249369106645012")} **-Some one was left !**`)
    .setDescription(`
    **- Name: ** ${member.user.username}
    **- ID: ** ${member.id}
    `)

    log.send(embed)
    

})



client.login(process.env.TOKEN);