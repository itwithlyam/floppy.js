'use strict';

const {Command} = require("./Command")

class SlashCommand extends Command {
    constructor(data) {
        super(data)
        this.type = 1
    }
}


module.exports = {SlashCommand}
