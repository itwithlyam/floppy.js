const ws = require("ws")
let socket = new ws("ws://localhost:8080")
async function update(name, type, activites) {
    let base = {
        "op": 3,
        "d": {
          "since": 91879201,
          "activities": [{
            "name": "Save the Oxford Comma",
            "type": 0
          }],
          "status": "dnd",
          "afk": false
        }
      }
      socket.send(JSON.stringify(base))
}

module.exports = {update}