const {EventEmitter} = require("event")

class Component {
    constructor(data) {
        this.type = data.type
        this.custom_id = data.custom_id
        this.disabled = data.disabled
        this.style = data.style
        this.label = data.label
        this.emoji = data.label
        this.url = data.url
        this.options = data.options
        this.placeholder = data.placeholder
        this.min_values = data.min_values
        this.max_values = data.max_values
        this.components = data.components
    }
}

module.exports = {Component}