const { Client } = require("./client/gateway")

const client = new Client()
client.on("message", message => {
    console.log("message")
})

client.login("token")
