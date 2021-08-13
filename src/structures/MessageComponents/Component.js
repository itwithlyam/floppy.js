const {EventEmitter} = require("event")

class Component extends EventEmitter {
    constructor(data) {
        super()
        this.type = data.type
        this.name = data.name
    }
}

module.exports = {Component}