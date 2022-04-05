**Floppy.js is `deprecated` as of April 2022.**

# floppy.js
The Floppy.js Discord API Wrapper

## Installation
**Stable:**
`npm i floppy.js@latest`
**Daily**
`npm i floppy.js@daily`

## Usage
**Example**
```js
const Floppy = require("floppy.js")
const { token } = require("./token.json")

const bot = new Floppy.Bot()
bot.on("READY", async () => {
    console.log("Ready!")
    await bot.createStatus("watching", "FloppyJS", "idle")
    console.log("Status set!")
})
bot.on("GUILD_CREATE", async guild => {
    console.log("Logged onto guild:", guild.name)
    console.log(await guild.getChannels())
})
bot.on("MESSAGE_CREATE", async message => {
    if (message.author.bot) return
    console.log("New message:", message.content)
    if (message.content === "ping") {
        await message.createReply("Pong!")
    }
})

bot.start(token)
```

_See the Docs at https://floppy.js.org_
