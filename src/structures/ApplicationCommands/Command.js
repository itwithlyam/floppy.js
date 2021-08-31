'use strict';

class Command {
    constructor(data) {
        this.id = data.id
        this.type = data.type
        this.application_id = data.application_id
        this.guild_id = data.guild_id
        this.name = data.name
        this.description = data.description
        this.options = data.options
        this.default_permission = data.default_permission
    }
}
module.exports = {Command}