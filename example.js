process.env.APPID = "789134602576461855"

const Floppy = require("./index.js")
const { token } = require("./token.json")
const assert = require('assert');
const {describe, it} = require("mocha")

const bot = new Floppy.Bot({appid: "789134602576461855"}, true)
const interactions = new Floppy.InteractionManager()

bot.on("READY", async () => {
           
    await interactions.init()

    console.log("Ready!")

    await bot.createStatus(1, "Lyam make FloppyJS", "online")

    await bot.createStatus(1, "Lyam make tests", "idle")
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
    if (thread.name === "testing-threads") {
        await thread.createMessage("testing")
    }
    if (thread.name === ".") {
        console.log(await thread.deleteThread())
    }
})
bot.on("APPLICATION_COMMAND_CREATE", async command => {
    console.log(command)
})
bot.on("INTERACTION_CREATE", async interaction => {
    console.log(interaction.createResponse({
        type: 5
    }))
})

bot.start(token)
 