const Floppy = require("./index.js")
const { token } = require("./token.json")
const webhook = new Floppy.WebhookManager("874244061538680853", "vQkaxegXmBVuJd0nfywvW5J8a6pUrLfQYDoc9l9g9eSu9mw-8BnEM-JCIpGkYWjcmhst")
console.log(webhook.createMessage("hi"))

const bot = new Floppy.Bot()
bot.on("READY", async () => {
    console.log("Ready!")
    await bot.createStatus(0, "Lyam make FloppyJS", "online")
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
 