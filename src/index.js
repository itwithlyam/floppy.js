const { Client } = require("./client/gateway")
const { token } = require("./token.json")

const client = new Client()
client.on("message", message => {
    console.log("message")
})

client.login(token)
