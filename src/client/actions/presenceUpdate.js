const ws = require("ws")
let socket = new ws("ws://localhost:8080")
function update(type, name, status) {
    let base = {
        "op": 3,
        "d": {
          "since": 91879201,
          "activities": [{
            "name": name,
            "type": type
          }],
          "status": status,
          "afk": false
        }
      }
      if (typeof type === "string") {
        switch(type) {
            case "playing":
                base.d.activities[0].type = 0
                break;
            case "streaming":
                base.d.activities[0].type = 1
                break;
            case "listening":
                base.d.activities[0].type = 2
                break;
            case "watching":
                base.d.activities[0].type = 3
                break;
            case "custom":
                base.d.activities[0].type = 4

        }
       } else {
        base.d.activities[0].type = type
       }
      socket.send(JSON.stringify(base))
}

module.exports = {update}