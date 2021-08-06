const Floppy = require("./index.js")
const { token } = require("./token.json")

const bot = new Floppy.Bot()
bot.on("READY", () => {
    console.log("Ready!")
    bot.setStatus(0, "Lyam make FloppyJS", "online")
    console.log("Status set!")
})
bot.on("GUILD_CREATE", guild => {
    console.log("Logged onto guild:", guild.name)
})
bot.on("MESSAGE_CREATE", message => {
    if (message.author.bot) return
    console.log("New message:", message.content)
    message.reply("testing")
})

bot.start(token)
 