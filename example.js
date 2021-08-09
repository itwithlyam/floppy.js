const Floppy = require("./index.js")
const { token } = require("./token.json")

const bot = new Floppy.Bot()
bot.on("READY", async () => {
    console.log("Ready!")
    await bot.createStatus(1, "Lyam make FloppyJS", "online")
    console.log("Status set!")
})
bot.on("GUILD_CREATE", async guild => {
    console.log("Logged onto guild:", guild.name)
})
bot.on("MESSAGE_CREATE", async message => {
    if (message.author.bot) return
    console.log("New message:", message.content)
    await message.createReply("ohhh")
})
bot.on("THREAD_CREATE", async thread => {
    if (!thread.name === "testing-threads") return
    await thread.createMessage("testing")
})

bot.start(token)
 