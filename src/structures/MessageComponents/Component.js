const {EventEmitter} = require("event")

class Component {
    constructor(data) {
        this.type = data.type
        this.name = data.name
    }
}

module.exports = {Component}