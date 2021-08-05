const Floppy = require("./index.js")
const { token } = require("./token.json")

const bot = new Floppy.Bot()
bot.on("message", message => {
    console.log("message")
})

bot.start(token)
 