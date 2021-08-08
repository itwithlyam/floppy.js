const Floppy = require("./index.js")
const { token } = require("./token.json")

const bot = new Floppy.Bot()
bot.on("READY", () => {
    console.log("Ready!")
    bot.setStatus(0, "Lyam make FloppyJS", "online")
    console.log("Status set!")
})
bot.on("GUILD_CREATE", async guild => {
    console.log("Logged onto guild:", guild.name)
    if (guild.name === "bot") {
        console.log(await guild.getChannels())
    }
})
bot.on("MESSAGE_CREATE", async message => {
    if (message.author.bot) return
    console.log("New message:", message.content)
    await message.createReply("testing")
})

bot.start(token)
 