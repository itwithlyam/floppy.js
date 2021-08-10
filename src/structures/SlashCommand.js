class SlashCommand {
    constructor(data) {
        this.id = data.id
        this.application_id = data.application_id
        this.guild_id = data.guild_id
        this.name = data.name
        this.description = data.description
        this.options = data.options
        this.default_permission = data.default_permission
    }
}


module.exports = {SlashCommand}
