const { Client } = require("./client/gateway")

const client = new Client()
client.on("message", message => {
    console.log("message")
})

client.login("NzMxODU3MzEwMzM0NTgyODM1.XwsJPA.iVdqlwkJM0cSepvMA-C5W92u9JE")